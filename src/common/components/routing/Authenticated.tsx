import {Redirect, RouteComponentProps} from "@reach/router"
import React, {ComponentType, ReactElement} from "react"
import {useLoginExpiryQuery} from "../../../generated/graphql"
import {useID} from "../../hooks"

interface PropTypes extends RouteComponentProps<any> {
    component?: ComponentType<RouteComponentProps<any>> | ComponentType<{}>
    render?: (props: RouteComponentProps<any>) => ReactElement
}

export const Authenticated = ({component: C, render, ...rest}: PropTypes) => {
    const id = useID()
    const {data} = useLoginExpiryQuery()
    const {location} = rest
    const authenticated = id !== "" && new Date(data!.loginExpiresAt) >= new Date()

    if(!authenticated) return <Redirect to={`/login?redirect=${location!.pathname}${location!.search}`} />

    if(C) return <C {...rest} />
    if(render) return render(rest)!
    return null
}

export default Authenticated
