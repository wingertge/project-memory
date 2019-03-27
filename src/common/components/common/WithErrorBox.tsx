import {ApolloError} from "apollo-client"
import React from "react"
import {WithTranslation, withTranslation} from "react-i18next"
import {compose, pure} from "recompose"
import ErrorBox from "./ErrorBox"

interface PropTypes {
    prop: {error?: ApolloError}
    retry?: (data: any) => void
    children: any
}

type Props = PropTypes & WithTranslation

const WithErrorBox = ({prop: {error}, retry, children, t}: Props) => {
    const title = error && (error.message.includes(":") ? error.message.split(":")[0].trim() : "Error")
    const message = error && (error.message.includes(":") ? error.message.split(":")[1].trim() : error.message.trim())
    return (
        <>
            {error && <ErrorBox title={t(title!)} text={t(message!)} retry={retry} />}
            {children}
        </>
    )
}

export default compose<Props, PropTypes>(
    pure,
    withTranslation()
)(WithErrorBox)
