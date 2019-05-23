import {Redirect, RouteComponentProps} from "@reach/router"
import React, {ComponentType, ReactElement} from "react"
import {useLoginExpiryQuery} from "../../../generated/graphql"
import {useID} from "../../hooks"

interface PropTypes extends RouteComponentProps<any> {
    component?: ComponentType<RouteComponentProps<any>> | ComponentType<{}>
    render?: (props: RouteComponentProps<any>) => ReactElement
}

export const Unauthenticated = ({component: C, render, ...rest}: PropTypes) => {
    const id = useID()
    const {data} = useLoginExpiryQuery()
    const authenticated = id !== "" && new Date(data!.loginExpiresAt) >= new Date()

    if(authenticated) return <Redirect to="/" />

    if(C) return <C {...rest} />
    if(render) return render(rest)!
    return null
}

export default Unauthenticated
