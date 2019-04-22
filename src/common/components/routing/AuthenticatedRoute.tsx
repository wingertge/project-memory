import React from "react"
import {Route, RouteProps, Redirect} from "react-router"
import useRouter from "use-react-router/use-react-router"
import {useLoginExpiryQuery} from "../../../generated/graphql"
import {useID} from "../../hooks"


export const AuthenticatedRoute = (props: RouteProps) => {
    const {location} = useRouter()
    const id = useID()
    const {data} = useLoginExpiryQuery()

    if(id === "" || new Date(data!.loginExpiresAt) < new Date()) return <Redirect to={`/login?redirect=${location.pathname}${location.search}`} />
    else return <Route {...props} />
}

export default AuthenticatedRoute
