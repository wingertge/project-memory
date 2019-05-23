import {WebAuth} from "auth0-js"

const auth0 = new WebAuth({
    domain: window.__REACT_APP_AUTH0_DOMAIN__,
    clientID: window.__REACT_APP_AUTH0_CLIENT_ID__,
    redirectUri: window.__REACT_APP_AUTH0_CALLBACK__,
    audience: window.__REACT_APP_AUTH0_AUDIENCE__
})

export const login = (redirectBack = true, location: string = "/") => {
    const params = {
        responseType: "code",
        scope: "openid profile email update:current_user_metadata",
        state: "/"
    }
    if (redirectBack) {
        params.state = location
    }

    auth0.authorize(params)
}

export const logout = () => {
    auth0.logout({
        returnTo: window.__REACT_APP_AUTH0_LOGOUT_CALLBACK__!,
        clientID: window.__REACT_APP_AUTH0_CLIENT_ID__!
    })
}
