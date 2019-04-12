import React from "react"
import {Route, withRouter, RouteProps, RouteComponentProps} from "react-router"
import {compose, pure, withProps} from "recompose"
import {redirectOnError, withUser, WithUser} from "../../enhancers"

interface FakeErrorProps {
    data: {
        error?: string
    }
}

type Props = RouteComponentProps<{}> & RouteProps & WithUser & FakeErrorProps

export default compose<Props, RouteProps>(
    pure,
    withRouter,
    withUser(),
    withProps<FakeErrorProps, Props>(({user}) => ({
        data: {
            error: user ? undefined : "Not logged in"
        }
    })),
    redirectOnError<Props>(props => `/login?redirect=${props.location.pathname}${props.location.search}`)
)(Route)
