import {ChunkExtractor} from "@loadable/server"
import {CssBaseline} from "@material-ui/core"
import {ThemeProvider, ServerStyleSheets} from "@material-ui/styles"
import {ServerLocation} from "@reach/router"
import cookieParser from "cookie-parser"
import express from "express"
import * as path from "path"
import React from "react"
import {ApolloProvider, getMarkupFromTree} from "react-apollo-hooks"
import {renderToString} from "react-dom/server"
import morgan from "morgan"
import {I18nextProvider} from "react-i18next"
import I18NextMiddleware from "i18next-express-middleware"
import i18n from "i18next"
import App from "../common/App"
import theme from "../common/theme"
import {createApollo} from "./Apollo"
import {handleCallback} from "./Auth"
import {manageCookies} from "./Cookies"
import {appSrc, initI18n, preloadI18n} from "./i18n"
import {Layout} from "./Layout"
import jwt from "jsonwebtoken"
import proc from "./env"
import device from "express-device"

const server = express()

initI18n(() => {
    server
        .disable("x-powered-by")
        .use("/locales", express.static(`${appSrc}/locales`))
        .use(express.static(process.env.NODE_ENV === "production" ? path.join(__dirname, "../build/public") : "public"))
        .use(cookieParser(proc.env.COOKIE_SECRET))
        .use(morgan("tiny"))
        .use(I18NextMiddleware.handle(i18n, {removeLngFromUrl: false}))
        .use(device.capture())
        .post("/locales/add/:lng/:ns", I18NextMiddleware.missingKeyHandler(i18n))
        .get("/*", async (req, res) => {
            const routeParams = req.params[0].split("/")
            const extractor = new ChunkExtractor({
                statsFile: path.resolve("build/loadable-stats.json"),
                entrypoints: ["client"]
            })

            manageCookies(routeParams[0], req, res)

            let __auth__ = req.signedCookies.__auth__
            const decoded = __auth__ && jwt.decode(__auth__)
            const id = decoded && decoded[`${proc.env.REACT_APP_OAUTH_NAMESPACE}/id`] || "none"
            // tslint:disable-next-line:no-string-literal
            const expiresAt = decoded && new Date(decoded["exp"] * 1000) || undefined
            let apollo = createApollo({auth: __auth__, id, loginExpiry: expiresAt})

            const callback = await handleCallback(routeParams[0], req, res, apollo)
            apollo = callback.apollo
            __auth__ = callback.token || __auth__

            // Create the server side style sheet
            const sheets = new ServerStyleSheets()
            const context = {} as any

            const Root = () => (
                <I18nextProvider i18n={req.i18n}>
                    <ApolloProvider client={apollo.client}>
                        <ServerLocation url={req.url}>
                            <ThemeProvider theme={theme}>
                                <CssBaseline />
                                <App />
                            </ThemeProvider>
                        </ServerLocation>
                    </ApolloProvider>
                </I18nextProvider>
            )

            const markup = await getMarkupFromTree({
                renderFunction: tree => renderToString(sheets.collect(tree)),
                tree: extractor.collectChunks(<Root />)
            })

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
                scripts: extractor.getScriptTags(),
                links: extractor.getLinkTags()
            })
            res.send(result)
        }) // end get
})

export default server
