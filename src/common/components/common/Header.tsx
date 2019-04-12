import {
    AppBar, Badge,
    createStyles, Hidden,
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
import {compose, lifecycle, pure, withHandlers} from "recompose"
import {oc} from "ts-optchain"
import Auth from "../../../client/Auth"
import {withReviewsCount} from "../../../generated/graphql"
import {withProps, withState, withUser, WithUser} from "../../enhancers"
import LinkButton from "./LinkButton"
import Logo from "../../assets/logo.png"

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
    },
    logo: {
        width: 40,
        height: 40,
        marginLeft: theme.spacing.unit * -1.5,
        marginRight: theme.spacing.unit
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
    reviewsCountData: any
}

interface HandlerTypes {
    openMenu: (event) => void
    closeMenu: () => void
    openSettings: () => void
    openReviews: () => void
    logout: () => void
}

type Props = GraphQLPropTypes & RouteComponentProps<{}> & StateTypes & HandlerTypes & WithTranslation & WithStyles<typeof styles> & WithUser

const Header = ({classes, t, username, anchorEl, openMenu, closeMenu, openSettings, logout, pendingReviews, openReviews}: Props) => (
    <AppBar position="sticky" className={classes.appBar}>
        <Toolbar>
            <img src={Logo} alt={t("Logo")} className={classes.logo} />
            <Typography variant="h6" color="inherit">
                <LinkButton to="/" className={classes.navbarLink}>{t("Home")}</LinkButton>
            </Typography>
            {typeof pendingReviews !== "undefined" && (
                <IconButton onClick={openReviews} className={classes.reviewsButton}>
                    <Badge badgeContent={pendingReviews} max={42} color="secondary" classes={{badge: classes.badge}} invisible={pendingReviews <= 0}>
                        <AssignmentLate className={classes.reviewsIcon} />
                    </Badge>
                </IconButton>
            )}
            <div className={classes.grow} />
            <div>
                {username && (
                    <Hidden smDown>
                        <LinkButton to="/profile" className={classes.navbarLink}>{username}</LinkButton>
                    </Hidden>
                )}
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

let date = new Date().toISOString()
let component: any

const queueReviewRefetch = () => {
    setTimeout(() => {
        queueReviewRefetch()
        date = new Date().toISOString()
        component.forceUpdate()
    }, 60000)
}

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
    withProps<Props>(({user}) => ({
        authenticated: !!user,
        username: oc(user).username() || null
    })),
    withReviewsCount<Props, Partial<GraphQLPropTypes>>({
        skip: ({user}) => !user,
        options: ({user}) => ({
            variables: {
                userId: user && user.id,
                filter: {toBeReviewedBy: date}
            }
        }),
        props: ({data}) => ({
            reviewsCountData: data,
            pendingReviews: oc(data).user.reviewsCount(0)
        })
    }),
    withHandlers<Props, Partial<HandlerTypes>>({
        openMenu: ({authenticated, updateAnchorEl, location}) => event => authenticated ? updateAnchorEl(event.currentTarget) : Auth.login(true, location),
        openSettings: ({closeMenu, history}) => () => {
            closeMenu()
            history.push("/settings")
        },
        openReviews: ({history}) => () => {
            history.push("/reviews")
        },
        logout: ({closeMenu, history}) => () => {
            closeMenu()
            history.push("/logout")
        }
    }),
    lifecycle<Props, {}>({
        componentDidMount() {
            component = this
            queueReviewRefetch()
        },
        componentDidUpdate() {
            component = this
        }
    })
)(Header)
