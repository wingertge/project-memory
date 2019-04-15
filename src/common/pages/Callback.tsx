import {parse} from "qs"
import React from "react"
import {useTranslation} from "react-i18next"
import {Redirect} from "react-router"
import useRouter from "use-react-router/use-react-router"
import ErrorBox from "../components/common/ErrorBox"

export const Callback = () => {
    const {t} = useTranslation()
    const {location: {search}} = useRouter()
    const query = parse(search.replace("?", ""))
    const code = query.code as string
    const redirectTo = "/"

    if (!code) return <ErrorBox title={t("Error")} text={t("Missing Authorization code from URL")}/>

    return <Redirect to={redirectTo}/>
}

// noinspection JSUnusedGlobalSymbols
export default Callback
