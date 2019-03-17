/* tslint:disable:no-console */
import {createGenerateClassName, CssBaseline, MuiThemeProvider, Theme} from "@material-ui/core"
import {InMemoryCache} from "apollo-cache-inmemory"
import {ApolloClient} from "apollo-client"
import {createHttpLink} from "apollo-link-http"
import cookieParser from "cookie-parser"
import express from "express"
import * as fs from "fs"
import i18n from "../common/i18n"
import {SheetsRegistry} from "jss"
import fetch from "node-fetch"
import React from "react"
import {ApolloProvider, getDataFromTree} from "react-apollo"
import reactHelmet from "react-helmet"
import {I18nextProvider} from "react-i18next"
import {JssProvider} from "react-jss"
import {StaticRouter} from "react-router"
import serialize from "serialize-javascript"
import App from "../common/App"
import {login} from "../common/mutations/user"
import theme from "../common/theme"
import {Login} from "../generated-models"
import {createMemoryHistory} from "history"
import {renderToString} from "react-dom/server"
import morgan from "morgan"
import Loadable from "react-loadable"
import {ApolloLink} from "apollo-link"
import {onError} from "apollo-link-error"
import {RetryLink} from "apollo-link-retry"
import {withClientState} from "apollo-link-state"
//import stats from "../../build/react-loadable.json"
// import _ from 'lodash';
// import sitemap from 'express-sitemap';
// import { renderToString } from 'react-dom/server';

//const ReactCC = require("react-component-caching")
//const componentCache = new ReactCC.ComponentCache()
// tslint:disable-next-line:no-var-requires
const debug = require("debug")("SSR")
// tslint:disable-next-line:no-var-requires
const assets = require(process.env.RAZZLE_ASSETS_MANIFEST!)
const server = express()
//const MobileDetect = require("mobile-detect")

// https://realfavicongenerator.net/
const icons = `
<!--suppress HtmlUnknownTarget -->
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="manifest" href="/manifest.json">
<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">
<meta name="msapplication-TileColor" content="#da532c">
<meta name="theme-color" content="#ffffff">
`

const superSecretSecret = "Lisa is cute"
const authCookieOptions = {
    signed: true,
    httpOnly: true,
    secure: false
}

const initHttpLink = auth => createHttpLink({
    uri: process.env.REACT_APP_API_ENDPOINT,
    fetch,
    headers: auth && {
        authorization: `Bearer ${auth}`
    }
})

const initStateLink = cache => withClientState({
    cache,
    defaults: {},
    resolvers: {}
})

const initErrorLink = () => onError(({graphQLErrors, networkError}) => {
    if (graphQLErrors) {
        graphQLErrors.map(({message, locations, path}) => {
            debug(`[GraphQL error]: Message: ${JSON.stringify([message])}, Location: ${JSON.stringify(locations)}, Path: ${JSON.stringify(path)}`)
        })
    }
    if(networkError) {
        debug(`[Network error]: ${networkError}`)
    }
})

const createApollo = (auth: string,
                      cache: InMemoryCache = new InMemoryCache(),
                      stateLink: ApolloLink = initStateLink(cache),
                      errorLink: ApolloLink = initErrorLink(),
                      retryLink: ApolloLink = new RetryLink(),
                      httpLink: ApolloLink = initHttpLink(auth)) => {
    const link = ApolloLink.from([errorLink, stateLink, retryLink, httpLink])

    return {
        client: new ApolloClient({
            link,
            cache
        }),
        cache,
        stateLink,
        errorLink,
        retryLink,
        httpLink
    }
}

server
    .disable("x-powered-by")
    .use(express.static(process.env.RAZZLE_PUBLIC_DIR!))
    .use(cookieParser(superSecretSecret))
    .use(morgan("tiny"))
    // can remove /api section if not testing
    .get("/*", async (req, res) => {
        //const md = new MobileDetect(req.headers["user-agent"])
        //let initialPortalWidth = (md.mobile() ? 600 : 1000)

        // turn http://localhost:3000/animal/goat into ['animal', 'goat']
        const routeParams = req.params[0].split("/")

        if(routeParams[0] === "logout") {
            res.clearCookie("__auth__", authCookieOptions)
            res.redirect("/")
            return
        }

        const cookieNames = Object.keys(req.cookies)
        for(const cookieName of cookieNames) {
            if(cookieName.startsWith("com.auth0.auth")) {
                res.clearCookie(cookieName)
            }
        }

        const __auth__ = req.signedCookies.__auth__
        let apollo = createApollo(__auth__)

        if(req.query.code && routeParams.length === 1 && routeParams[0] === "callback") {
            const authResult = await apollo.client.mutate<Login.Mutation, Login.Variables>({
                mutation: login,
                variables: {
                    authorizationCode: req.query.code
                }
            })

            if(authResult.data && authResult.data.authenticate) {
                const token = authResult.data.authenticate.accessToken
                const {cache, stateLink, errorLink, retryLink} = apollo
                apollo = createApollo(token, cache, stateLink, errorLink, retryLink)
                res.cookie("__auth__", token, {...authCookieOptions, maxAge: authResult.data.authenticate.expiresIn * 1000})
            }
        }

        // Create the server side style sheet
        const sheetRegistry = new SheetsRegistry()

        const sheetsManager = new Map()
        const generateClassName = createGenerateClassName()

        // const initialStore = ;
        const Root = ({disableStyles = false}) => (
            <I18nextProvider i18n={i18n}>
                <ApolloProvider client={apollo.client}>
                    <StaticRouter location={req.url} context={{}}>
                        <JssProvider registry={sheetRegistry} generateClassName={generateClassName}>
                            <MuiThemeProvider theme={theme as Theme} sheetsManager={sheetsManager} disableStylesGeneration={disableStyles}>
                                <CssBaseline />
                                <App />
                            </MuiThemeProvider>
                        </JssProvider>
                    </StaticRouter>
                </ApolloProvider>
            </I18nextProvider>
        )

        const history = createMemoryHistory({
            initialEntries: [req.url]
        })

        if(req.query.state && JSON.parse(req.query.state)) {
            history.push(JSON.parse(req.query.state))
        }

        const modules: string[] = []

        await getDataFromTree(<Root disableStyles/>)
        const markup = await renderToString(
            <Loadable.Capture report={moduleName => modules.push(moduleName)}>
                <Root />
            </Loadable.Capture>
        )
        const css = sheetRegistry.toString()
            //const bundles = getBundles(stats, modules)
        const result = layout(markup, apollo.client.extract(), css, __auth__)
        res.send(result)
    }) // end get

const layout = (markup, initialState, css, authToken) => {
    const helmet = reactHelmet.renderStatic(markup)

    // get css from markup to be placed in initial html
    console.log("writing server css")
    fs.writeFileSync("site.css", css)
    fs.writeFileSync("site.html", markup)

    return `<!doctype html>
        <html lang="">
        <head>
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta charSet='utf-8' />
            <meta name="viewport" content="width=device-width, initial-scale=1">
            ${helmet.title.toString()}
            ${helmet.meta.toString()}
            ${helmet.link.toString()}
            ${icons}
            ${assets.client.css
        ? `<link rel="stylesheet" href="${assets.client.css}">`
        : ""}
              ${process.env.NODE_ENV === "production"
        ? `<script src="${assets.client.js}" defer></script>`
        : `<script src="${assets.client.js}" defer crossorigin></script>`}
          <style id="jss-server-side">${css}</style>
        </head>
        <body>
            <div id="root">${markup}</div>
            <script>
              window.__PRELOADED_STATE__ = ${serialize(initialState)}
              window.__AUTH__ = "${authToken}"
            </script>
        </body>
    </html>`
}

export default server
