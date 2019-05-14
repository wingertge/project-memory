import {ApolloError} from "apollo-client"
import * as React from "react"
import ErrorBox from "./ErrorBox"

interface PropTypes {
    error?: ApolloError
    retry?: () => void
}

export const ApolloErrorBox = ({error, retry}: PropTypes) => {
    const title = error && (error.message.includes(":") ? error.message.split(":")[0].trim() : "Error")
    const message = error && (error.message.includes(":") ? error.message.split(":")[1].trim() : error.message.trim())
    return error ? <ErrorBox title={title!} text={message!} retry={retry} /> : null
}

export default ApolloErrorBox
