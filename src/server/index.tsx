import {CssBaseline, Theme} from "@material-ui/core"
import {ThemeProvider} from "@material-ui/styles"
import ServerStyleSheets from "@material-ui/styles/ServerStyleSheets"
import cookieParser from "cookie-parser"
import express from "express"
import React from "react"
import {ApolloProvider, getDataFromTree} from "react-apollo"
import {ApolloProvider as ApolloHooksProvider} from "react-apollo-hooks"
import {renderToString} from "react-dom/server"
import morgan from "morgan"
import {I18nextProvider} from "react-i18next"
import Loadable from "react-loadable"
import I18NextMiddleware from "i18next-express-middleware"
import i18n from "i18next"
import {StaticRouter} from "react-router"
import App from "../common/App"
import theme from "../common/theme"
import {createApollo} from "./Apollo"
import {handleCallback} from "./Auth"
import {manageCookies} from "./Cookies"
import {appSrc, initI18n, preloadI18n} from "./i18n"
import {Layout} from "./Layout"
import {getBundleScripts} from "./ReactLoadable"
import jwt from "jsonwebtoken"


const server = express()

initI18n(() => {
    server
        .disable("x-powered-by")
        .use("/locales", express.static(`${appSrc}/locales`))
        .use(express.static(process.env.RAZZLE_PUBLIC_DIR!))
        .use(cookieParser(process.env.COOKIE_SECRET))
        .use(morgan("tiny"))
        .use(I18NextMiddleware.handle(i18n, {removeLngFromUrl: false}))
        .post("/locales/add/:lng/:ns", I18NextMiddleware.missingKeyHandler(i18n))
        .get("/*", async (req, res) => {
            const routeParams = req.params[0].split("/")

            manageCookies(routeParams[0], req, res)

            const __auth__ = req.signedCookies.__auth__
            const decoded = __auth__ && jwt.decode(__auth__)
            const id = decoded && decoded[`${process.env.REACT_APP_OAUTH_NAMESPACE}/id`] || "none"
            let apollo = createApollo({auth: __auth__, id})

            apollo = await handleCallback(routeParams[0], req, res, apollo)

            // Create the server side style sheet
            const sheets = new ServerStyleSheets()
            const context = {} as any

            const modules: string[] = []

            const Root = () => (
                <I18nextProvider i18n={req.i18n}>
                    <ApolloProvider client={apollo.client}>
                        <ApolloHooksProvider client={apollo.client}>
                            <StaticRouter location={req.url} context={context}>
                                <ThemeProvider theme={theme as Theme}>
                                    <CssBaseline />
                                    <App />
                                </ThemeProvider>
                            </StaticRouter>
                        </ApolloHooksProvider>
                    </ApolloProvider>
                </I18nextProvider>
            )

            await getDataFromTree(<Root />)
            const markup = await renderToString(
                sheets.collect(
                    <Loadable.Capture report={moduleName => modules.push(moduleName)}>
                        <Root />
                    </Loadable.Capture>
                )
            )

            const {url} = context
            if(url) {
                res.redirect(url)
                return
            }

            const {initialI18nStore, initialLanguage} = preloadI18n(req.i18n)
            const result = Layout({
                markup,
                authToken: __auth__,
                lang: initialLanguage,
                initialState: apollo.client.extract(),
                i18Store: initialI18nStore,
                css: sheets.toString(),
                bundle: getBundleScripts(modules)
            })
            res.send(result)
        }) // end get
})

export default server
