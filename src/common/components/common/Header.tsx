import {
    AppBar, Badge,
    createStyles,
    IconButton,
    Menu,
    MenuItem, Theme,
    Toolbar,
    Typography, WithStyles,
    withStyles
} from "@material-ui/core"
import {AccountCircle, AssignmentLate} from "@material-ui/icons"
import React from "react"
import {withTranslation, WithTranslation} from "react-i18next"
import {RouteComponentProps, withRouter} from "react-router"
import {compose, pure, withHandlers, withProps} from "recompose"
import {oc} from "ts-optchain"
import Auth from "../../../client/Auth"
import {withState, withUser, WithUser} from "../../enhancers"
import LinkButton from "./LinkButton"

const styles = (theme: Theme) => createStyles({
    appBar: {
        zIndex: theme.zIndex.drawer + 1
    },
    navbarLink: {
        fontSize: 16,
        marginRight: theme.spacing.unit * 3
    },
    grow: {
        flexGrow: 1
    },
    badge: {
        //backgroundColor: "#434343"
/*        borderWidth: 1.5,
        borderColor: "#fff",
        borderStyle: "solid"*/
    },
    reviewsButton: {
        padding: 4
    },
    reviewsIcon: {
        width: 36,
        height: 36
    }
})

interface StateTypes {
    anchorEl: HTMLElement | null
    updateAnchorEl: (state: HTMLElement | null) => HTMLElement | null
}

interface GraphQLPropTypes {
    authenticated: boolean
    username: string | null
    pendingReviews: number
}

interface HandlerTypes {
    openMenu: (event) => void
    closeMenu: () => void
    openSettings: () => void
    logout: () => void
}

type Props = GraphQLPropTypes & RouteComponentProps<{}> & StateTypes & HandlerTypes & WithTranslation & WithStyles<typeof styles> & WithUser

const Header = ({classes, t, username, anchorEl, openMenu, closeMenu, openSettings, logout, pendingReviews}: Props) => (
    <AppBar position="sticky" className={classes.appBar}>
        <Toolbar>
            <Typography variant="h6" color="inherit">
                <LinkButton to="/" className={classes.navbarLink}>{t("Home")}</LinkButton>
            </Typography>
            {pendingReviews !== -1 && <IconButton className={classes.reviewsButton}>
                <Badge badgeContent={pendingReviews} max={42} color="secondary" classes={{badge: classes.badge}}>
                    <AssignmentLate className={classes.reviewsIcon} />
                </Badge>
            </IconButton>}
            <div className={classes.grow} />
            <div>
                {username && <LinkButton to="/profile" className={classes.navbarLink}>{username}</LinkButton>}
                <IconButton aria-owns={!!anchorEl ? "menu-appbar" : undefined} aria-haspopup="true"
                            onClick={openMenu} color="inherit">
                    <AccountCircle />
                </IconButton>
                <Menu id="menu-appbar" anchorEl={anchorEl} anchorOrigin={{vertical: "top", horizontal: "right"}}
                      open={!!anchorEl} onClose={closeMenu}>
                    <MenuItem onClick={openSettings}>{t("Settings")}</MenuItem>
                    <MenuItem onClick={logout}>{t("Sign Out")}</MenuItem>
                </Menu>
            </div>
        </Toolbar>
    </AppBar>
)

export {Header as RawAppHeader}

export default compose<Props, {}>(
    pure,
    withStyles(styles),
    withTranslation(),
    withRouter,
    withState<Props, HTMLElement | null>("anchorEl", "updateAnchorEl", null),
    withHandlers<Props, Partial<HandlerTypes>>({
        closeMenu: ({updateAnchorEl}) => () => updateAnchorEl(null)
    }),
    withUser(),
    withProps<GraphQLPropTypes, Props>(({user}) => ({
        authenticated: !!user,
        username: oc(user).username() || null,
        pendingReviews: oc(user).reviewQueueLength(-1)
    })),
    withHandlers<Props, Partial<HandlerTypes>>({
        openMenu: ({authenticated, updateAnchorEl, location}) => event => authenticated ? updateAnchorEl(event.currentTarget) : Auth.login(true, location),
        openSettings: ({closeMenu, history}) => () => {
            closeMenu()
            history.push("/settings")
        },
        logout: ({closeMenu, history}) => () => {
            closeMenu()
            history.push("/logout")
        }
    })
)(Header)
