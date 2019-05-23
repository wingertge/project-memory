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
