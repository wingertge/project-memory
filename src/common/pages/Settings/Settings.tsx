import {Theme} from "@material-ui/core"
import {createStyles, makeStyles} from "@material-ui/styles"
import React from "react"
import Helmet from "react-helmet"
import {useTranslation} from "react-i18next"
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
            width: "100%",
            padding: theme.spacing(0, 2)
        },
        toolbar: theme.mixins.toolbar
    })
)

export const Settings = () => {
    const classes = useStyles()
    const {t} = useTranslation()

    return (
        <div className={classes.root}>
            <Helmet>
                <title>{t("Settings - Project Memory")}</title>
            </Helmet>
{/*            <ResponsiveDrawer isOpen={true}>
                <div className={classes.toolbar}/>
            </ResponsiveDrawer>*/}
            <div className={classes.settingsBox}>
                <ProfileSettings />
                <Spacer multiplier={2}/>
                <DecksOverview />
            </div>
        </div>
    )
}

export default Settings
