import React from "react"
import {Route, Redirect, RouteProps} from "react-router"
import {useID} from "../../hooks"

interface PropTypes {
    props?: object
}

type Props = PropTypes & RouteProps

export const UnauthenticatedRoute = ({component, props: cProps, ...rest}: Props) => {
    const C = component as any
    const id = useID()
    return (
        <Route {...rest} render={props =>
            id === ""
                ? <C {...props} {...cProps} />
                : <Redirect to="/" />
        } />
    )
}

export default UnauthenticatedRoute
