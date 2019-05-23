import {LoginDocument, LoginMutation, LoginMutationVariables} from "../generated/graphql"
import {Apollo, createApollo} from "./Apollo"
import {authCookieOptions} from "./Cookies"
import jwt from "jsonwebtoken"
import proc from "./env"

export const handleCallback = async (basePath: string, req, res, apollo: Apollo) => {
    let newApollo: Apollo | undefined
    let token: string | undefined
    if(req.query.code && basePath === "callback") {
        const authResult = await apollo.client.mutate<LoginMutation, LoginMutationVariables>({
            mutation: LoginDocument,
            variables: {
                authorizationCode: req.query.code
            }
        })

        if(authResult.data && authResult.data.authenticate) {
            token = authResult.data.authenticate.accessToken
            const decoded = jwt.decode(token)
            const id = decoded![`${proc.env.REACT_APP_OAUTH_NAMESPACE}/id`]
            // tslint:disable-next-line:no-console
            console.log("id: " + id)
            const {cache, errorLink, retryLink} = apollo
            const loginExpiry = new Date(new Date().getTime() + authResult.data.authenticate.expiresIn * 1000)
            newApollo = createApollo({auth: token, id, loginExpiry, cache, errorLink, retryLink})
            res.cookie("__auth__", token, {...authCookieOptions, maxAge: authResult.data.authenticate.expiresIn * 1000})
        }
    }

    return {apollo: newApollo || apollo, token}
}
