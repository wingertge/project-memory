import {CircularProgress, createStyles, withStyles} from "@material-ui/core"
import {parse} from "qs"
import React from "react"
import {RouteComponentProps, withRouter} from "react-router"
import {compose, lifecycle, pure} from "recompose"
import Auth from "../../client/Auth"

const styles = createStyles({})

const Login = () => (
    <CircularProgress/>
)

// noinspection JSUnusedGlobalSymbols
export default compose<RouteComponentProps<{}>, {}>(
    pure,
    withStyles(styles),
    withRouter,
    lifecycle<RouteComponentProps<{}>, {}>({
        componentDidMount(this) {
            Auth.login(true, parse(this.props.location.search.replace("?", "")).redirect || "/")
        }
    })
)(Login)
