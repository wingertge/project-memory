import {
    Card, CardContent
} from "@material-ui/core"
import {createStyles, makeStyles} from "@material-ui/styles"
import * as React from "react"
import {Theme} from "../../theme"
import LanguageSettings from "./LanguageSettings"
import ProfileSettingsContent from "./ProfileSettingsContent"

const useStyles = makeStyles((theme: Theme) => createStyles({
    card: {
        flexGrow: 1
    },
    cardContent: {
        padding: 12,
        marginBottom: -12
    },
    spacer: {
        height: theme.spacing(1)
    }
}))

export const ProfileSettings = () => {
    const classes = useStyles()

    return (
        <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
                <ProfileSettingsContent/>
            </CardContent>
            <div className={classes.spacer}/>
            <LanguageSettings/>
        </Card>
    )
}

export default ProfileSettings
