import React from "react"
import {Route, Redirect, RouteProps} from "react-router"
import {useLoginExpiryQuery} from "../../../generated/graphql"
import {useID} from "../../hooks"

export const UnauthenticatedRoute = (props: RouteProps) => {
    const id = useID()
    const {data} = useLoginExpiryQuery()
    const authenticated = id !== "" && new Date(data!.loginExpiresAt) >= new Date()

    if(authenticated) return <Redirect to="/" />
    else return <Route {...props} />
}

export default UnauthenticatedRoute
