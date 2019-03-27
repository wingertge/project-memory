import {LoginDocument, LoginMutation, LoginMutationVariables} from "../generated/graphql"
import {Apollo, createApollo} from "./Apollo"
import {authCookieOptions} from "./Cookies"
import jwt from "jsonwebtoken"

export const handleCallback = async (basePath: string, req, res, apollo: Apollo) => {
    let newApollo: Apollo | undefined
    if(req.query.code && basePath === "callback") {
        const authResult = await apollo.client.mutate<LoginMutation, LoginMutationVariables>({
            mutation: LoginDocument,
            variables: {
                authorizationCode: req.query.code
            }
        })

        if(authResult.data && authResult.data.authenticate) {
            const token = authResult.data.authenticate.accessToken
            const decoded = jwt.decode(token)
            const id = decoded![`${process.env.REACT_APP_OAUTH_NAMESPACE}/uuid`]
            const {cache, errorLink, retryLink} = apollo
            newApollo = createApollo({auth: token, id, cache, errorLink, retryLink})
            res.cookie("__auth__", token, {...authCookieOptions, maxAge: authResult.data.authenticate.expiresIn * 1000})
        }
    }

    return newApollo || apollo
}
