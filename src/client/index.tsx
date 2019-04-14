import {createGenerateClassName, ThemeProvider} from "@material-ui/styles"
import {ApolloLink} from "apollo-link"
import {withClientState} from "apollo-link-state"
import localTypeDefs from "../common/localTypeDefs"
import i18n from "./i18n"
import React, {Suspense} from "react"
import {hydrate} from "react-dom"
import {I18nextProvider, useSSR} from "react-i18next"
import {CssBaseline, Theme} from "@material-ui/core"
import theme from "../common/theme"
import {JssProvider} from "react-jss"
import {createHttpLink} from "apollo-link-http"
import {ApolloClient} from "apollo-client"
import {InMemoryCache} from "apollo-cache-inmemory"
import {ApolloProvider} from "react-apollo"
import {ApolloProvider as ApolloHooksProvider} from "react-apollo-hooks"
import {BrowserRouter} from "react-router-dom"
import Loadable from "react-loadable"
import * as env from "./env"

// tslint:disable-next-line:no-var-requires
let App = require("../common/App").default

class Main extends React.Component {
    // Remove the server-side injected CSS.
    componentDidMount() {
        const jssStyles = document.getElementById("jss-server-side")
        if (jssStyles && jssStyles.parentNode) {
            jssStyles.parentNode.removeChild(jssStyles)
        }
    }

    render() {
        return (
            <Suspense fallback={null}>
                <App />
            </Suspense>
        )
    }
}

const MainApp = () => {
    // @ts-ignore
    useSSR(window.__PRELOADED_I18N__, window.__INITIAL_LANG__)
    return <Main />
}

// @ts-ignore
const cache = new InMemoryCache().restore(window.__PRELOADED_STATE__)

const stateLink = withClientState({
    cache,
    defaults: {},
    resolvers: {},
    typeDefs: localTypeDefs
})

const httpLink = createHttpLink({
    uri: env.REACT_APP_API_ENDPOINT,
    // @ts-ignore
    headers: window.__AUTH__ && {
        // @ts-ignore
        authorization: `Bearer ${window.__AUTH__}`
    }
})

const link = ApolloLink.from([stateLink, httpLink])

const client = new ApolloClient({
    link,
    cache
})

const RootApp = generateClassName => (
    <I18nextProvider i18n={i18n}>
        <ApolloProvider client={client}>
            <ApolloHooksProvider client={client}>
                <BrowserRouter>
                    <JssProvider generateClassName={generateClassName}>
                        <ThemeProvider theme={theme as Theme}>
                            <CssBaseline/>
                            <MainApp/>
                        </ThemeProvider>
                    </JssProvider>
                </BrowserRouter>
            </ApolloHooksProvider>
        </ApolloProvider>
    </I18nextProvider>
)

Loadable.preloadReady().then(() => {
    hydrate(
        RootApp(createGenerateClassName()),
        document.getElementById("root")
    )
})

if (module.hot) {
    module.hot.accept("../common/App", () => {
        App = require("../common/App").default
        hydrate(
            RootApp(createGenerateClassName()),
            document.getElementById("root")
        )
    })
}
