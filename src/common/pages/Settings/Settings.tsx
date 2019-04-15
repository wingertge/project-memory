import {Theme} from "@material-ui/core"
import {createStyles, makeStyles} from "@material-ui/styles"
import React from "react"
import ResponsiveDrawer from "../../components/common/ResponsiveDrawer"
import Spacer from "../../components/common/Spacer"
import DecksOverview from "../../components/profile/DecksOverview"
import ProfileSettings from "../../components/profile/ProfileSettings"

const useStyles = makeStyles((theme: Theme) => createStyles({
        root: {
            display: "flex"
        },
        settingsBox: {
            display: "flex",
            flexDirection: "column",
            width: "calc(100% - 400px)",
            padding: theme.spacing(0, 2)
        },
        toolbar: theme.mixins.toolbar
    })
)

export const Settings = () => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <ResponsiveDrawer isOpen={true}>
                <div className={classes.toolbar}/>
            </ResponsiveDrawer>
            <div className={classes.settingsBox}>
                <ProfileSettings/>
                <Spacer multiplier={2}/>
                <DecksOverview/>
            </div>
        </div>
    )
}

export default Settings
