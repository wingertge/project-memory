/*
The following is the license for the Project Memory Frontend, a frontend for the Project Memory web app.
Copyright (C) 2019  Genna Wingert

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

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
import {LocationContext} from "@reach/router"
import React, {forwardRef, useState} from "react"
import {useTranslation} from "react-i18next"
import {oc} from "ts-optchain"
import {useReviewsCountQuery} from "../../../generated/graphql"
import {useNow, useUser} from "../../hooks"
import LinkButton from "./LinkButton"
import Logo from "../../assets/logo.png"

const useStyles = makeStyles((theme: Theme) => createStyles({
    appBar: {
        zIndex: theme.zIndex.drawer + 1
    },
    navbarLink: {
        fontSize: 16,
        marginRight: theme.spacing(2)
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
        margin: theme.spacing(0, 1, 0, -1.5),
        cursor: "pointer"
    }
}))

export const Header = ({location, navigate}: LocationContext) => {
    const classes = useStyles()
    const {t} = useTranslation()
    const [anchorEl, setAnchorEl] = useState<any>(null)
    const openMenu = event => {
        if(authenticated) {
            setAnchorEl(event.currentTarget)
        } else {
            import("../../../client/auth").then(auth => auth.login(true, location!.pathname))
        }
    }
    const closeMenu = () => setAnchorEl(null)
    const user = useUser()
    const authenticated = !!user
    const username = oc(user).username() || null
    const now = useNow()

    const {data: reviewsData} = useReviewsCountQuery({
        skip: !user,
        variables: {
            userId: user && user.id,
            filter: {nextReviewAt: {lte: now}, box: {gt: 0}}
        }
    })

    const pendingReviews = oc(reviewsData).user.reviewsCount() || undefined

    const openSettings = () => {
        closeMenu()
        navigate!("/settings")
    }

    const openReviews = () => {
        navigate!("/reviews")
    }

    const logout = () => {
        closeMenu()
        navigate!("/logout")
    }

    const ProfileLink = forwardRef<HTMLLIElement>((_, ref) => (
        <Hidden smUp implementation="css">
            <MenuItem onClick={() => navigate!("/profile")} ref={ref}>{t("Profile")}</MenuItem>
        </Hidden>
    ))

    return (
        <AppBar position="sticky" className={classes.appBar}>
            <Toolbar>
                <img src={Logo} alt={t("Logo")} className={classes.logo} onClick={() => navigate!("/")} />
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
                    <Hidden xsDown implementation="js">
                        {username && <LinkButton to="/profile" className={classes.navbarLink}>{username}</LinkButton>}
                    </Hidden>
                    <IconButton aria-owns={!!anchorEl ? "menu-appbar" : undefined} aria-haspopup="true"
                                onClick={openMenu} color="inherit" title={authenticated ? undefined : t("Log in")}>
                        <AccountCircle/>
                    </IconButton>
                    <Menu id="menu-appbar" anchorEl={anchorEl} anchorOrigin={{vertical: "top", horizontal: "right"}}
                          open={!!anchorEl} onClose={closeMenu}>
                        <ProfileLink />
                        <MenuItem onClick={openSettings}>{t("Settings")}</MenuItem>
                        <MenuItem onClick={logout}>{t("Sign Out")}</MenuItem>
                    </Menu>
                </div>
            </Toolbar>
        </AppBar>
    )
}

export default Header
