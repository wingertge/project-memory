import {
    AppBar,
    Button,
    createStyles,
    IconButton,
    Menu,
    MenuItem, Theme,
    Toolbar,
    Typography, WithStyles,
    withStyles
} from "@material-ui/core"
import {AccountCircle} from "@material-ui/icons"
import React from "react"
import LinkButton from "./LinkButton"

const styles = (theme: Theme) => createStyles({
    appBar: {
        //@ts-ignore
        backgroundColor: theme.palette.appBar.main
    },
    navbarLink: {
        fontSize: 16,
        color: theme.palette.common.white,
        marginRight: theme.spacing.unit * 3
    },
    grow: {
        flexGrow: 1
    },
})

interface PropTypes {
    anchorEl: HTMLElement | null
    onMenuClick: (event) => void,
    onMenuClose: (event) => void,
    onProfileClick: (event) => void,
    onSignOutClick: (event) => void,
    username: string | null
}

type Props = WithStyles<typeof styles> & PropTypes

const Header = ({classes, anchorEl, onMenuClick, onMenuClose, onProfileClick, onSignOutClick, username}: Props) => {
    const menuOpen = Boolean(anchorEl)

    return (
        <AppBar position="static">
            <Toolbar className={classes.appBar}>
                <Typography variant="h6" color="inherit" className={classes.grow}>
                    <LinkButton to="/" className={classes.navbarLink}>Home</LinkButton>
                </Typography>
                <div>
                    {username && <Button onClick={onProfileClick} className={classes.navbarLink}>{username}</Button>}
                    <IconButton aria-owns={menuOpen ? "menu-appbar" : undefined} aria-haspopup="true"
                        onClick={onMenuClick} color="inherit">
                        <AccountCircle />
                    </IconButton>
                    <Menu id="menu-appbar" anchorEl={anchorEl} anchorOrigin={{vertical: "top", horizontal: "right"}}
                        open={menuOpen} onClose={onMenuClose}>
                        <MenuItem onClick={onProfileClick}>Profile</MenuItem>
                        <MenuItem onClick={onSignOutClick}>Sign Out</MenuItem>
                    </Menu>
                </div>
            </Toolbar>
        </AppBar>
    )
}

export default withStyles(styles)(Header)
