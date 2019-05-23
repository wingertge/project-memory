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

import {CircularProgress} from "@material-ui/core"
import {RouteComponentProps} from "@reach/router"
import {parse} from "qs"
import React, {useEffect} from "react"
import Helmet from "react-helmet"
import {useTranslation} from "react-i18next"

export const Login = ({location}: RouteComponentProps) => {
    const {t} = useTranslation()
    const {search} = location!
    useEffect(() => {
        if(typeof window !== "undefined") {
            import("../../client/auth").then(auth => auth.login(true, parse(search.replace("?", "")).redirect || "/"))
        }
    }, [])

    return (
        <>
            <Helmet>
                <title>{t("Login - Project Memory")}</title>
            </Helmet>
            <CircularProgress/>
        </>
    )
}

// noinspection JSUnusedGlobalSymbols
export default Login
