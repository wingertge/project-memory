import {Drawer, Hidden, Theme} from "@material-ui/core"
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
        }
    },
    drawerPaper: {
        [theme.breakpoints.up("sm")]: {
            //width: "25%",
            width: 300
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
                <Drawer
                    container={container}
                    variant="temporary"
                    anchor={theme.direction === "rtl" ? "right" : "left"}
                    open={open}
                    onClose={() => setOpen(false)}
                    classes={{
                        paper: classes.drawerPaper
                    }}
                >
                    {children}
                </Drawer>
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
