import {
    Card, CardContent
} from "@material-ui/core"
import {createStyles, makeStyles} from "@material-ui/styles"
import * as React from "react"
import LanguageSettings from "../../pages/Settings/LanguageSettings"
import Spacer from "../common/Spacer"
import ProfileSettingsContent from "./ProfileSettingsContent"

const useStyles = makeStyles(createStyles({
    card: {
        flexGrow: 1
    },
    cardContent: {
        padding: 12,
        marginBottom: -12
    }
}))

export const ProfileSettings = () => {
    const classes = useStyles()

    return (
        <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
                <ProfileSettingsContent/>
            </CardContent>
            <Spacer/>
            <LanguageSettings/>
        </Card>
    )
}

export default ProfileSettings
