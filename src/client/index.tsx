/*
The following is the license for the Project Memory Frontend, a frontend for the Project Memory web app.
Copyright (C) 2019  Genna Wingert

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

// tslint:disable-next-line:no-reference
///<reference path="../typings/index.d.ts"/>
import {loadableReady} from "@loadable/component"
import {ApolloLink} from "apollo-link"
import {BatchHttpLink} from "apollo-link-batch-http"
import ReactGA from "react-ga"
import {ThemeProvider} from "@material-ui/styles"
import localResolvers from "../common/apollo/localResolvers"
import localTypeDefs from "../common/apollo/localTypeDefs"
import i18n from "./i18n"
import React, {Suspense, useEffect} from "react"
import {hydrate} from "react-dom"
import {I18nextProvider, useSSR} from "react-i18next"
import {CssBaseline} from "@material-ui/core"
import theme from "../common/theme"
import {createUploadLink} from "apollo-upload-client"
import {ApolloClient} from "apollo-client"
import {InMemoryCache} from "apollo-cache-inmemory"
import {ApolloProvider} from "react-apollo-hooks"

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

const httpOptions = {
    uri: window.__REACT_APP_API_ENDPOINT__,
    headers: window.__AUTH__ && {
        authorization: `Bearer ${window.__AUTH__}`
    }
}
const httpLink = ApolloLink.split(
    operation => operation.getContext().hasUpload,
    createUploadLink(httpOptions),
    new BatchHttpLink(httpOptions)
)

const client = new ApolloClient({
    link: httpLink,
    cache,
    resolvers: localResolvers,
    typeDefs: localTypeDefs
})

const RootApp = () => (
    <I18nextProvider i18n={i18n}>
        <ApolloProvider client={client}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <MainApp/>
            </ThemeProvider>
        </ApolloProvider>
    </I18nextProvider>
)

loadableReady().then(() => {
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
