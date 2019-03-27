import React from "react"
import {DataValue} from "react-apollo"
import {Route, Redirect, RouteProps} from "react-router"
import {compose, mapProps, pure} from "recompose"
import {oc} from "ts-optchain"
import {WithUser, withUser} from "../../enhancers"

interface PropTypes {
    props?: object
}

interface GraphQLPropTypes {
    authenticated: boolean
}

type Props = PropTypes & RouteProps & GraphQLPropTypes & WithUser

const UnauthenticatedRoute = ({component, props: cProps, authenticated, ...rest}: Props) => {
    const C = component as any
    return (
        <Route {...rest} render={props =>
            !authenticated
                ? <C {...props} {...cProps} />
                : <Redirect to="/" />
        } />
    )
}

export default compose<Props, PropTypes & RouteProps>(
    pure,
    withUser(),
    mapProps<GraphQLPropTypes, Props>(({data}: WithUser) => ({authenticated: !oc(data as DataValue<any>).error()}))
)(UnauthenticatedRoute)
