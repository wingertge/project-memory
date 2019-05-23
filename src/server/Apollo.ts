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

import {InMemoryCache, NormalizedCacheObject} from "apollo-cache-inmemory"
import {ApolloClient} from "apollo-client"
import {ApolloLink} from "apollo-link"
import {onError} from "apollo-link-error"
import {BatchHttpLink} from "apollo-link-batch-http"
import {RetryLink} from "apollo-link-retry"
import fetch from "node-fetch"
import localResolvers from "../common/apollo/localResolvers"
import localTypeDefs from "../common/apollo/localTypeDefs"
import proc from "./env"

// tslint:disable-next-line:no-var-requires
const debug = require("debug")("Apollo")

const initHttpLink = auth => new BatchHttpLink({
    uri: proc.env.REACT_APP_API_ENDPOINT,
    fetch,
    headers: auth && {
        authorization: `Bearer ${auth}`
    }
})

const initCache = (cache: InMemoryCache, id?: string, loginExpiry?: Date) => {
    cache.writeData({
        data: {
            currentUserID: id,
            now: new Date().toISOString(),
            loginExpiresAt: loginExpiry!.toISOString()
        }
    })
    debug(cache.extract())
}

const initErrorLink = () => onError(({graphQLErrors, networkError}) => {
    if (graphQLErrors) {
        graphQLErrors.map(({message, locations, path: gqlPath}) => {
            debug(`[GraphQL error]: Message: ${JSON.stringify([message])}, Location: ${JSON.stringify(locations)}, Path: ${JSON.stringify(gqlPath)}`)
        })
    }
    if(networkError) {
        debug(`[Network error]: ${networkError}`)
    }
})

export interface Apollo {
    client: ApolloClient<NormalizedCacheObject>
    cache: InMemoryCache
    errorLink: ApolloLink
    retryLink: ApolloLink
}

export const createApollo = (parameters: { auth: string, id?: string, loginExpiry?: Date, cache?: InMemoryCache, errorLink?: ApolloLink, retryLink?: ApolloLink, stateLink?: ApolloLink, httpLink?: ApolloLink }
) => {
    const {auth, id, cache = new InMemoryCache(), errorLink = initErrorLink(), retryLink = new RetryLink(), loginExpiry = new Date()} = parameters
    const {httpLink = initHttpLink(auth)} = parameters
    const link = ApolloLink.from([errorLink, retryLink, httpLink])
    const client = new ApolloClient({
        link,
        cache,
        resolvers: localResolvers,
        typeDefs: localTypeDefs
    })
    initCache(cache, id, loginExpiry)

    return {
        client,
        cache,
        errorLink,
        retryLink
    }
}
