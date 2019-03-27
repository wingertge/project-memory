import {InMemoryCache, NormalizedCacheObject} from "apollo-cache-inmemory"
import {ApolloClient} from "apollo-client"
import {ApolloLink} from "apollo-link"
import {onError} from "apollo-link-error"
import {createHttpLink} from "apollo-link-http"
import {RetryLink} from "apollo-link-retry"
import {withClientState} from "apollo-link-state"
import fetch from "node-fetch"
import localTypeDefs from "../common/localTypeDefs"

// tslint:disable-next-line:no-var-requires
const debug = require("debug")("Apollo")

const initHttpLink = auth => createHttpLink({
    uri: process.env.REACT_APP_API_ENDPOINT,
    fetch,
    headers: auth && {
        authorization: `Bearer ${auth}`
    }
})

const initStateLink = (cache, id?: string) => withClientState({
    cache,
    defaults: {
        currentUserID: id
    },
    resolvers: {},
    typeDefs: localTypeDefs
})

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
    client: ApolloClient<NormalizedCacheObject>,
    cache: InMemoryCache,
    stateLink: ApolloLink,
    errorLink: ApolloLink,
    retryLink: ApolloLink,
    httpLink: ApolloLink
}

export const createApollo = (parameters: { auth: string, id?: string, cache?: InMemoryCache, errorLink?: ApolloLink, retryLink?: ApolloLink, stateLink?: ApolloLink, httpLink?: ApolloLink }
) => {
    const {auth, id, cache = new InMemoryCache(), errorLink = initErrorLink(), retryLink = new RetryLink()} = parameters
    const {stateLink = initStateLink(cache, id), httpLink = initHttpLink(auth)} = parameters
    const link = ApolloLink.from([errorLink, stateLink, retryLink, httpLink])

    return {
        client: new ApolloClient({
            link,
            cache
        }),
        cache: cache || new InMemoryCache(),
        stateLink,
        errorLink,
        retryLink,
        httpLink
    }
}
