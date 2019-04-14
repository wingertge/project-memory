/* tslint:disable:max-classes-per-file */
import {parse} from "qs"
import React from "react"
import {WithTranslation, withTranslation} from "react-i18next"
import {Redirect, RouteComponentProps, withRouter} from "react-router"
import {compose, pure} from "recompose"
import ErrorBox from "../components/common/ErrorBox"

type Props = RouteComponentProps<{}> & WithTranslation

const Callback = ({location: {search}, t}: Props) => {
    const query = parse(search.replace("?", ""))
    const code = query.code as string
    const redirectTo = "/"

    if (!code) return <ErrorBox title={t("Error")} text={t("Missing Authorization code from URL")}/>

    return <Redirect to={redirectTo}/>
}

export {Callback as RawCallback}

// noinspection JSUnusedGlobalSymbols
export default compose<Props, {}>(
    pure,
    withTranslation(),
    withRouter
)(Callback)
