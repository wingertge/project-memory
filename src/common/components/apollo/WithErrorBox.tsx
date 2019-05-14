import {ApolloError} from "apollo-client"
import React from "react"
import {useTranslation} from "react-i18next"
import ErrorBox from "./ErrorBox"

interface PropTypes {
    prop: {error?: ApolloError}
    retry?: (data: any) => void
    children: any
}

export const WithErrorBox = ({prop: {error}, retry, children}: PropTypes) => {
    const {t} = useTranslation()
    const title = error && (error.message.includes(":") ? error.message.split(":")[0].trim() : "Error")
    const message = error && (error.message.includes(":") ? error.message.split(":")[1].trim() : error.message.trim())
    return (
        <>
            {error && <ErrorBox title={t(title!)} text={t(message!)} retry={retry} />}
            {children}
        </>
    )
}

export default WithErrorBox
