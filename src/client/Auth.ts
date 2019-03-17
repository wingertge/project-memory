import auth0 from "auth0-js"
import {REACT_APP_AUTH0_DOMAIN} from "./env"
import * as env from "./env"
import {Location} from "history"

class Auth {
    private auth0 = new auth0.WebAuth({
        domain: env.REACT_APP_AUTH0_DOMAIN,
        clientID: env.REACT_APP_AUTH0_CLIENT_ID,
        redirectUri: env.REACT_APP_AUTH0_CALLBACK,
        audience: env.REACT_APP_AUTH0_AUDIENCE
    })

    login = (redirectBack = true, location: string | Location<any> = "/") => {
        const params = {
            responseType: "code",
            scope: "openid profile email update:current_user_metadata",
            state: "/"
        }
        if (redirectBack) {
            params.state = JSON.stringify(location)
        }
        this.auth0.authorize(params)
    }

    logout = () => {
        this.auth0.logout({
            returnTo: env.REACT_APP_AUTH0_LOGOUT_CALLBACK!,
            clientID: env.REACT_APP_AUTH0_CLIENT_ID!
        })
    }
}

export default new Auth()
