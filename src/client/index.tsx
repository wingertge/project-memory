import {ApolloLink} from "apollo-link"
import {withClientState} from "apollo-link-state"
import i18n from "../common/i18n"
import React from "react"
import {hydrate} from "react-dom"
import {I18nextProvider} from "react-i18next"
import App from "../common/App"
import {MuiThemeProvider, CssBaseline, createGenerateClassName, Theme} from "@material-ui/core"
import theme from "../common/theme"
import {JssProvider} from "react-jss"
import {createHttpLink} from "apollo-link-http"
import {ApolloClient} from "apollo-client"
import {InMemoryCache} from "apollo-cache-inmemory"
import {ApolloProvider} from "react-apollo"
import {BrowserRouter} from "react-router-dom"
import * as env from "./env"

class Main extends React.Component {
    // Remove the server-side injected CSS.
    componentDidMount() {
        const jssStyles = document.getElementById("jss-server-side")
        if (jssStyles && jssStyles.parentNode) {
            jssStyles.parentNode.removeChild(jssStyles)
        }
    }

    render() {
        return <App />
    }
}

// @ts-ignore
const cache = new InMemoryCache().restore(window.__PRELOADED_STATE__)

const stateLink = withClientState({
    cache,
    defaults: {},
    resolvers: {}
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

const Root = generateClassName => (
    <I18nextProvider i18n={i18n}>
        <ApolloProvider client={client}>
            <BrowserRouter>
                <JssProvider generateClassName={generateClassName}>
                    <MuiThemeProvider theme={theme as Theme}>
                        <CssBaseline />
                        <Main />
                    </MuiThemeProvider>
                </JssProvider>
            </BrowserRouter>
        </ApolloProvider>
    </I18nextProvider>
)

hydrate(
    Root(createGenerateClassName()),
    document.getElementById("root")
)

if (module.hot) {
    module.hot.accept("../common/App", () => {
        const generateClassName = createGenerateClassName()
        hydrate(
            Root(generateClassName),
            document.getElementById("root")
        )
    })
}
