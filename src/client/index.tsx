// tslint:disable-next-line:no-reference
///<reference path="../typings/index.d.ts"/>
import ReactGA from "react-ga"
import {ThemeProvider} from "@material-ui/styles"
import localResolvers from "../common/localResolvers"
import localTypeDefs from "../common/localTypeDefs"
import i18n from "./i18n"
import React, {Suspense, useEffect} from "react"
import {hydrate} from "react-dom"
import {I18nextProvider, useSSR} from "react-i18next"
import {CssBaseline} from "@material-ui/core"
import theme from "../common/theme"
import {BatchHttpLink} from "apollo-link-batch-http"
import {ApolloClient} from "apollo-client"
import {InMemoryCache} from "apollo-cache-inmemory"
import {ApolloProvider} from "react-apollo-hooks"
import {BrowserRouter} from "react-router-dom"
import Loadable from "react-loadable"

// tslint:disable-next-line:no-var-requires
let App = require("../common/App").default

const MainApp = () => {
    useSSR(window.__PRELOADED_I18N__, window.__INITIAL_LANG__)
    useEffect(() => {
        const jssStyles = document.querySelector("#jss-server-side")
        if (jssStyles) {
            jssStyles.parentNode!.removeChild(jssStyles)
        }
    }, [])
    return (
        <Suspense fallback={null}>
            <App />
        </Suspense>
    )
}

ReactGA.initialize("UA-139865103-1")
ReactGA.pageview(window.location.pathname + window.location.search)

const cache = new InMemoryCache().restore(window.__PRELOADED_STATE__ as any)

const httpLink = new BatchHttpLink({
    uri: window.__REACT_APP_API_ENDPOINT__,
    headers: window.__AUTH__ && {
        authorization: `Bearer ${window.__AUTH__}`
    }
})

const client = new ApolloClient({
    link: httpLink,
    cache,
    resolvers: localResolvers,
    typeDefs: localTypeDefs
})

const RootApp = () => (
    <I18nextProvider i18n={i18n}>
        <ApolloProvider client={client}>
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <CssBaseline/>
                    <MainApp/>
                </ThemeProvider>
            </BrowserRouter>
        </ApolloProvider>
    </I18nextProvider>
)

Loadable.preloadReady().then(() => {
    hydrate(
        RootApp(),
        document.getElementById("root")
    )
})

if (module.hot) {
    module.hot.accept("../common/App", () => {
        App = require("../common/App").default
        hydrate(
            RootApp(),
            document.getElementById("root")
        )
    })
}
