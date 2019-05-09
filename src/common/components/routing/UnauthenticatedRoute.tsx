import React from "react"
import {Route, Redirect, RouteProps} from "react-router"
import useRouter from "use-react-router/use-react-router"
import {useLoginExpiryQuery} from "../../../generated/graphql"
import {useID} from "../../hooks"

export const UnauthenticatedRoute = (props: RouteProps) => {
    const {location} = useRouter()
    const id = useID()
    const {data} = useLoginExpiryQuery()
    const authenticated = id !== "" && new Date(data!.loginExpiresAt) >= new Date()

    if(authenticated) return <Redirect to={`/login?redirect=${location.pathname}${location.search}`} />
    else return <Route {...props} />
}

export default UnauthenticatedRoute
