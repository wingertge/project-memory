import {createGenerateClassName, CssBaseline, MuiThemeProvider, Theme} from "@material-ui/core"
import cookieParser from "cookie-parser"
import express from "express"
import {SheetsRegistry} from "jss"
import React from "react"
import {ApolloProvider, getDataFromTree} from "react-apollo"
import {createMemoryHistory} from "history"
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
import {JssProvider} from "react-jss"
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
            const id = decoded && decoded[`${process.env.REACT_APP_OAUTH_NAMESPACE}/uuid`]
            let apollo = createApollo({auth: __auth__, id})

            apollo = await handleCallback(routeParams[0], req, res, apollo)

            // Create the server side style sheet
            const sheetRegistry = new SheetsRegistry()
            const context = {} as any

            const history = createMemoryHistory({
                initialEntries: [req.url]
            })

            if(req.query.state && JSON.parse(req.query.state)) {
                history.push(JSON.parse(req.query.state))
            }

            const modules: string[] = []
            const generateClassNames = createGenerateClassName()

            const Root = ({disableStyles = false}) => (
                <I18nextProvider i18n={req.i18n}>
                    <ApolloProvider client={apollo.client}>
                        <StaticRouter location={req.url} context={context}>
                            <JssProvider registry={sheetRegistry} generateClassName={generateClassNames}>
                                <MuiThemeProvider theme={theme as Theme} sheetsManager={new Map()} disableStylesGeneration={disableStyles}>
                                    <CssBaseline />
                                    <App />
                                </MuiThemeProvider>
                            </JssProvider>
                        </StaticRouter>
                    </ApolloProvider>
                </I18nextProvider>
            )

            await getDataFromTree(<Root disableStyles />)
            const markup = await renderToString(
                <Loadable.Capture report={moduleName => modules.push(moduleName)}>
                    <Root />
                </Loadable.Capture>
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
                css: sheetRegistry.toString(),
                bundle: getBundleScripts(modules)
            })
            res.send(result)
        }) // end get
})

export default server
