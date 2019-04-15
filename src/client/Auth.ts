import auth0 from "auth0-js"
import {Location} from "history"

class Auth {
    private auth0 = new auth0.WebAuth({
        domain: process.env.REACT_APP_AUTH0_DOMAIN!,
        clientID: process.env.REACT_APP_AUTH0_CLIENT_ID!,
        redirectUri: process.env.REACT_APP_AUTH0_CALLBACK!,
        audience: process.env.REACT_APP_AUTH0_AUDIENCE!
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
            returnTo: process.env.REACT_APP_AUTH0_LOGOUT_CALLBACK!,
            clientID: process.env.REACT_APP_AUTH0_CLIENT_ID!
        })
    }
}

export default new Auth()
