import {ComponentClass, FunctionComponent} from "react"
import {Route} from "react-router"
import {useLoginExpiryQuery} from "../../../generated/graphql"
import {useID} from "../../hooks"
import React from "react"

interface PropTypes {
    authenticatedComponent: FunctionComponent | ComponentClass
    unauthenticatedComponent: FunctionComponent | ComponentClass
    exact?: boolean
    path: string
}

export const SwitchedRoute = ({authenticatedComponent, unauthenticatedComponent, ...rest}: PropTypes) => {
    const id = useID()
    const {data} = useLoginExpiryQuery()

    if(id === "" || new Date(data!.loginExpiresAt) < new Date()) return <Route component={unauthenticatedComponent} {...rest} />
    else return <Route component={authenticatedComponent} {...rest} />
}
