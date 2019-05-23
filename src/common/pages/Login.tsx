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
