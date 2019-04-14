import React from "react"
import {Route, RouteProps, Redirect} from "react-router"
import useRouter from "use-react-router/use-react-router"
import {useID} from "../../hooks"


export const AuthenticatedRoute = (props: RouteProps) => {
    const {location} = useRouter()
    const id = useID()

    if(id === "") return <Redirect to={`/login?redirect=${location.pathname}${location.search}`} />
    else return <Route {...props} />
}

export default AuthenticatedRoute
