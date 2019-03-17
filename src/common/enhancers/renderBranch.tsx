import * as React from "react"
import {ComponentType} from "react"
import {Redirect} from "react-router"
import {branch, renderComponent} from "recompose"
import {oc} from "ts-optchain"

export function renderWhileLoading(Component: ComponentType, propName = "data") {
    return branch(
        props => oc(props[propName] as { loading?: boolean }).loading() || false,
        renderComponent(Component)
    )
}

export function renderOnError(Component: ComponentType, propName = "data") {
    return branch(
        props => !!oc(props[propName] as {error?: string}).error() || false,
        renderComponent(Component)
    )
}

export const redirectOnError = (to: string, propName = "data") => renderOnError(() => <Redirect to={to} />, propName)
