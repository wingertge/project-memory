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
