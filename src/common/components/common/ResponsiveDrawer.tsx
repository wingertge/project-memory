import {Drawer, Hidden, SwipeableDrawer, Theme} from "@material-ui/core"
import {createStyles, makeStyles, useTheme} from "@material-ui/styles"
import {useState} from "react"
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
        height: theme.spacing(8)
    }
}))

export const ResponsiveDrawer = ({children, container, isOpen}: PropTypes) => {
    const theme = useTheme<Theme>()
    const classes = useStyles()
    const [open, setOpen] = useState(isOpen)

    return (
        <div className={classes.drawer}>
            <Hidden smUp implementation="css">
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
            <Hidden xsDown implementation="css">
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
