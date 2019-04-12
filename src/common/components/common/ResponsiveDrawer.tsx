import {createStyles, Drawer, Hidden, Theme, withStyles, WithStyles, WithTheme} from "@material-ui/core"
import * as React from "react"
import {compose, pure, withHandlers} from "recompose"
import {withState} from "../../enhancers"

interface PropTypes {
    children: any
    container?: React.ReactInstance | (() => React.ReactInstance) | null
}

interface StateTypes {
    isOpen: boolean
}

interface HandlerTypes {
    close: () => void
}

interface UpdaterTypes {
    updateIsOpen: (state: boolean) => boolean
}

type Props = PropTypes & StateTypes & HandlerTypes & UpdaterTypes & WithStyles<typeof styles> & WithTheme

const styles = (theme: Theme) => createStyles({
    drawer: {
        [theme.breakpoints.up("sm")]: {
            //width: "25%",
            width: 400,
            flexShrink: 0
        }
    },
    drawerPaper: {
        [theme.breakpoints.up("sm")]: {
            //width: "25%",
            width: 400
        }
    }
})

const ResponsiveDrawer = ({children, classes, theme, container, isOpen, close}: Props) => (
    <div className={classes.drawer}>
        <Hidden smUp>
            <Drawer
                container={container}
                variant="temporary"
                anchor={theme.direction === "rtl" ? "right" : "left"}
                open={isOpen}
                onClose={close}
                classes={{
                    paper: classes.drawerPaper
                }}
            >
                {children}
            </Drawer>
        </Hidden>
        <Hidden xsDown>
            <Drawer classes={{
                paper: classes.drawerPaper
            }} variant="permanent" open>
                {children}
            </Drawer>
        </Hidden>
    </div>
)


export default compose<Props, PropTypes & StateTypes>(
    pure,
    withStyles(styles, {withTheme: true}),
    withState<Props, boolean>("isOpen", "updateIsOpen", ({isOpen}) => isOpen),
    withHandlers<Props, HandlerTypes>({
        close: ({updateIsOpen}) => () => updateIsOpen(true)
    })
)(ResponsiveDrawer)
