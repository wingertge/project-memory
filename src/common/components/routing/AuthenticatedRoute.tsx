import React from "react"
import {Route, withRouter, RouteProps, RouteComponentProps} from "react-router"
import {compose, pure} from "recompose"
import {redirectOnError, withUser, WithUser} from "../../enhancers"

type Props = RouteComponentProps<{}> & RouteProps & WithUser

export default compose<Props, RouteProps>(
    pure,
    withRouter,
    withUser(),
    redirectOnError<Props>(props => `/login?redirect=${props.location.pathname}${props.location.search}`)
)(Route)
