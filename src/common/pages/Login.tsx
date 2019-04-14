import {CircularProgress} from "@material-ui/core"
import {parse} from "qs"
import React from "react"
import {RouteComponentProps, withRouter} from "react-router"
import {compose, lifecycle, pure} from "recompose"
import Auth from "../../client/Auth"

const Login = () => (
    <CircularProgress/>
)

// noinspection JSUnusedGlobalSymbols
export default compose<RouteComponentProps<{}>, {}>(
    pure,
    withRouter,
    lifecycle<RouteComponentProps<{}>, {}>({
        componentDidMount(this) {
            Auth.login(true, parse(this.props.location.search.replace("?", "")).redirect || "/")
        }
    })
)(Login)
