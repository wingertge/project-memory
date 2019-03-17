/* tslint:disable:max-classes-per-file */
import React, {Component} from "react"
import {WithStyles, withStyles} from "@material-ui/core"
import {Redirect, RouteComponentProps, withRouter} from "react-router"
import ErrorBox from "../components/common/ErrorBox"
import {parse} from "qs"
import {compose} from "recompose"

const styles = {}
type Props = RouteComponentProps<{}> & WithStyles<typeof styles>

class Callback extends Component<Props> {
    public render() {
        const {location: {search}} = this.props
        const query = parse(search.replace("?", ""))
        const code = query.code as string
        const redirectTo = (query.state && JSON.parse(query.state as string)) || "/"

        if(!code) return <ErrorBox title="Error" text="Missing Authorization code from URL"/>

        return <Redirect to={redirectTo}/>
    }
}

export {Callback as RawCallback}

export default compose<Props, {}>(
    withRouter,
    withStyles(styles)
)(Callback)
