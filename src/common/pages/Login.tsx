import React, {Component} from "react"
import {withStyles, CircularProgress} from "@material-ui/core"

const styles = {}

class Login extends Component {
    render() {
        return (
            <CircularProgress />
        )
    }
}

export default withStyles(styles)(Login)
