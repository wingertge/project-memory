import * as React from "react"
import ErrorBox from "../components/common/ErrorBox"
import {addBefore} from "./wrap"

export function withErrorBox<TProps>(retryName?: keyof TProps, propName: keyof TProps | string = "data") {
    return addBefore((props: any) => {
        const retry = retryName && props[retryName]
        const error = props[propName] && props[propName].error
        const title = error && (error.message.includes(":") ? error.message.split(":")[0].trim() : "Error")
        const message = error && (error.message.includes(":") ? error.message.split(":")[1].trim() : error.message.trim())
        return (
            error && <ErrorBox title={title} text={message} retry={retry} />
        ) || null
    })
}
