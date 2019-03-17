import React, {Component} from "react"
import {withStyles} from "@material-ui/core"
import {RouteComponentProps, withRouter} from "react-router"
import {compose} from "recompose"
import {oc} from "ts-optchain"
import {GetProfile} from "../../../generated-models"
import Header from "./Header"
import Auth from "../../../client/Auth"
import {boundMethod} from "autobind-decorator"

const styles = {}

interface IStateTypes {
    anchorEl: object | null
}

interface GraphQLPropTypes {
    authenticated: boolean
    username: string | null
}

type Props = GraphQLPropTypes & RouteComponentProps<{}>

class AppHeader extends Component<Props, IStateTypes> {
    state = {
        anchorEl: null
    }

    @boundMethod
    menuClicked(event) {
        if (this.props.authenticated) {
            this.setState({anchorEl: event.currentTarget})
        } else {
            Auth.login(true, this.props.location)
        }
    }

    @boundMethod
    closeMenu() {
        this.setState({anchorEl: null})
    }

    @boundMethod
    navigateToProfile() {
        this.closeMenu()
        this.props.history.push("/profile")
    }

    @boundMethod
    logout() {
        this.closeMenu()
        this.props.history.push("/logout")
    }

    render() {
        const {anchorEl} = this.state
        const {username} = this.props

        return (
            <Header onMenuClick={this.menuClicked} onMenuClose={this.closeMenu} anchorEl={anchorEl} onProfileClick={this.navigateToProfile} onSignOutClick={this.logout} username={username} />
        )
    }
}

const withGQL = GetProfile.HOC<RouteComponentProps, GraphQLPropTypes>({
    props: ({data}) => ({
        username: oc(data).user.username() || null,
        authenticated: !!(oc(data).user())
    }),
    options: {
        errorPolicy: "ignore"
    }
})

export {AppHeader as RawAppHeader}

export default compose<Props, {}>(
    withStyles(styles),
    withRouter,
    withGQL
)(AppHeader)
