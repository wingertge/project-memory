import {Theme} from "@material-ui/core"
import {createStyles, makeStyles} from "@material-ui/styles"
import React from "react"
import Helmet from "react-helmet"
import {useTranslation} from "react-i18next"
import DecksOverview from "./DecksOverview"
import ProfileSettings from "./ProfileSettings"

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        display: "flex"
    },
    settingsBox: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        padding: theme.spacing(0, 2)
    },
    spacer: {
        height: theme.spacing(2)
    },
    toolbar: theme.mixins.toolbar
}))

export const Settings = () => {
    const classes = useStyles()
    const {t} = useTranslation()

    return (
        <div className={classes.root}>
            <Helmet>
                <title>{t("Settings - Project Memory")}</title>
            </Helmet>
            <div className={classes.settingsBox}>
                <ProfileSettings />
                <div className={classes.spacer} />
                <DecksOverview />
            </div>
        </div>
    )
}

export default Settings
