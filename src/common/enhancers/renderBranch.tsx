import * as React from "react"
import {ComponentType} from "react"
import {Redirect} from "react-router"
import {branch, mapper, renderComponent} from "recompose"
import {oc} from "ts-optchain"

export function renderWhileLoading(Component: ComponentType, propName = "data") {
    return branch(
        props => oc(props[propName] as { loading?: boolean }).loading() || false,
        renderComponent(Component)
    )
}

export function renderOnError(Component: ComponentType<any>, propName = "data") {
    return branch(
        props => !!oc(props[propName] as {error?: string}).error() || false,
        renderComponent(Component)
    )
}

export function redirectOnError<TProps = {}>(to: string | mapper<TProps, string>, propName = "data") {
    return renderOnError((props: any) => <Redirect to={typeof to === "function" ? to(props) : to} />, propName)
}
