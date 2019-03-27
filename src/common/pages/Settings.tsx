import {createStyles, Grid, Theme, WithStyles, withStyles} from "@material-ui/core"
import React from "react"
import {compose, pure} from "recompose"
import ResponsiveDrawer from "../components/common/ResponsiveDrawer"
import Spacer from "../components/common/Spacer"
import DecksOverview from "../components/profile/DecksOverview"
import ProfileSettings from "../components/profile/ProfileSettings"

const styles = (theme: Theme) => createStyles({
    root: {
        display: "flex"
    },
    settingsBox: {
        display: "flex",
        flexDirection: "column",
        width: "calc(100% - 400px)",
        paddingLeft: theme.spacing.unit * 2,
        paddingRight: theme.spacing.unit * 2
    },
    toolbar: theme.mixins.toolbar
})

type Props = WithStyles<typeof styles>

const Settings = ({classes}: Props) => (
    <div className={classes.root}>
        <ResponsiveDrawer isOpen={true}>
            <div className={classes.toolbar} />
        </ResponsiveDrawer>
        <div className={classes.settingsBox}>
            <ProfileSettings />
            <Spacer multiplier={2} />
            <DecksOverview />
        </div>
    </div>
)

export {Settings as RawSettings}

// noinspection JSUnusedGlobalSymbols
export default compose<Props, {}>(
    pure,
    withStyles(styles)
)(Settings)