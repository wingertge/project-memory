import {CircularProgress} from "@material-ui/core"
import {parse} from "qs"
import React, {useEffect} from "react"
import Helmet from "react-helmet"
import {useTranslation} from "react-i18next"
import useRouter from "use-react-router/use-react-router"
import Auth from "../../client/Auth"

export const Login = () => {
    const {t} = useTranslation()
    const {location: {search}} = useRouter()
    useEffect(() => {if(window) Auth.login(true, parse(search.replace("?", "")).redirect || "/")}, [])

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
