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

import {Drawer, Hidden, SwipeableDrawer, Theme} from "@material-ui/core"
import {createStyles, makeStyles, useTheme} from "@material-ui/styles"
import {useEffect, useState} from "react"
import * as React from "react"

interface PropTypes {
    children: any
    container?: React.ReactInstance | (() => React.ReactInstance) | null
    isOpen: boolean
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    drawer: {
        [theme.breakpoints.up("sm")]: {
            //width: "25%",
            width: 300,
            flexShrink: 0
        },
        [theme.breakpoints.down("sm")]: {
            width: "75%"
        }
    },
    drawerPaper: {
        [theme.breakpoints.up("sm")]: {
            //width: "25%",
            width: 300
        },
        [theme.breakpoints.down("sm")]: {
            width: "75%"
        }
    },
    headerPadding: {
        height: theme.spacing(7),
        "@media (min-width:0px) and (orientation: landscape)": {
            height: theme.spacing(6)
        },
        [theme.breakpoints.up(600)]: {
            height: theme.spacing(8)
        }
    }
}))

export const ResponsiveDrawer = ({children, container, isOpen}: PropTypes) => {
    const theme = useTheme<Theme>()
    const classes = useStyles()
    const [open, setOpen] = useState(isOpen)

    useEffect(() => setOpen(isOpen), [isOpen])

    return (
        <div className={classes.drawer}>
            <Hidden mdUp implementation="css">
                <SwipeableDrawer
                    container={container}
                    variant="temporary"
                    anchor={theme.direction === "rtl" ? "right" : "left"}
                    open={open}
                    onClose={() => setOpen(false)}
                    onOpen={() => setOpen(true)}
                    swipeAreaWidth={50}
                    disableBackdropTransition
                    classes={{
                        paper: classes.drawerPaper
                    }}
                >
                    {children}
                </SwipeableDrawer>
            </Hidden>
            <Hidden smDown implementation="css">
                <Drawer classes={{
                    paper: classes.drawerPaper
                }} variant="permanent" open>
                    <div className={classes.headerPadding} />
                    {children}
                    <div style={{height: 72}} />
                </Drawer>
            </Hidden>
        </div>
    )
}

export default ResponsiveDrawer
