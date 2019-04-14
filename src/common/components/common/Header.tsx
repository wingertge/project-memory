import {
    AppBar, Badge,
    Hidden,
    IconButton,
    Menu,
    MenuItem, Theme,
    Toolbar, Tooltip,
    Typography
} from "@material-ui/core"
import {AccountCircle, AssignmentLate} from "@material-ui/icons"
import {createStyles, makeStyles} from "@material-ui/styles"
import React, {useState} from "react"
import {useTranslation} from "react-i18next"
import {oc} from "ts-optchain"
import useRouter from "use-react-router/use-react-router"
import Auth from "../../../client/Auth"
import {useReviewsCountQuery} from "../../../generated/graphql"
import {useUser} from "../../hooks"
import LinkButton from "./LinkButton"
import Logo from "../../assets/logo.png"

const useStyles = makeStyles((theme: Theme) => createStyles({
    appBar: {
        zIndex: theme.zIndex.drawer + 1
    },
    navbarLink: {
        fontSize: 16,
        marginRight: theme.spacing(3)
    },
    grow: {
        flexGrow: 1
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
        margin: theme.spacing(0, 1, 0, -1.5)
    }
}))

export const Header = () => {
    const classes = useStyles()
    const {t} = useTranslation()
    const {history, location} = useRouter()
    const [anchorEl, setAnchorEl] = useState<any>(null)
    const openMenu = event => authenticated ? setAnchorEl(event.currentTarget) : Auth.login(true, location)
    const closeMenu = () => setAnchorEl(null)
    const user = useUser()
    const authenticated = !!user
    const username = oc(user).username() || null

    const {data: reviewsData} = useReviewsCountQuery({
        skip: !user,
        variables: {
            userId: user && user.id,
            filter: {toBeReviewedBy: date}
        }
    })

    const pendingReviews = oc(reviewsData).user.reviewsCount(0)

    const openSettings = () => {
        closeMenu()
        history.push("/settings")
    }

    const openReviews = () => {
        history.push("/reviews")
    }

    const logout = () => {
        closeMenu()
        history.push("/logout")
    }

    return (
        <AppBar position="sticky" className={classes.appBar}>
            <Toolbar>
                <img src={Logo} alt={t("Logo")} className={classes.logo}/>
                <Typography variant="h6" color="inherit">
                    <LinkButton to="/" className={classes.navbarLink}>{t("Home")}</LinkButton>
                </Typography>
                {typeof pendingReviews !== "undefined" && (
                    <Tooltip title={t("Reviews")}>
                        <IconButton onClick={openReviews} className={classes.reviewsButton}>
                            <Badge badgeContent={pendingReviews} max={42} color="secondary"
                                   invisible={pendingReviews <= 0}>
                                <AssignmentLate className={classes.reviewsIcon}/>
                            </Badge>
                        </IconButton>
                    </Tooltip>
                )}
                <div className={classes.grow}/>
                <div>
                    {username && (
                        <Hidden smDown>
                            <LinkButton to="/profile" className={classes.navbarLink}>{username}</LinkButton>
                        </Hidden>
                    )}
                    <IconButton aria-owns={!!anchorEl ? "menu-appbar" : undefined} aria-haspopup="true"
                                onClick={openMenu} color="inherit">
                        <AccountCircle/>
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
}

const date = new Date().toISOString()

export default Header
