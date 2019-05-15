import auth0 from "auth0-js"

class Auth {
    private auth0 = new auth0.WebAuth({
        domain: window.__REACT_APP_AUTH0_DOMAIN__,
        clientID: window.__REACT_APP_AUTH0_CLIENT_ID__,
        redirectUri: window.__REACT_APP_AUTH0_CALLBACK__,
        audience: window.__REACT_APP_AUTH0_AUDIENCE__
    })

    login = (redirectBack = true, location: string = "/") => {
        const params = {
            responseType: "code",
            scope: "openid profile email update:current_user_metadata",
            state: "/"
        }
        if (redirectBack) {
            params.state = location
        }

        this.auth0.authorize(params)
    }

    logout = () => {
        this.auth0.logout({
            returnTo: window.__REACT_APP_AUTH0_LOGOUT_CALLBACK__!,
            clientID: window.__REACT_APP_AUTH0_CLIENT_ID__!
        })
    }
}

export default (typeof window !== "undefined" && new Auth()) || {} as Auth
