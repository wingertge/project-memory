import {
    Card, CardContent
} from "@material-ui/core"
import {createStyles, withStyles, WithStyles} from "@material-ui/styles"
import * as React from "react"
import {compose, pure} from "recompose"
import LanguageSettings from "../../pages/Settings/LanguageSettings"
import Spacer from "../common/Spacer"
import ProfileSettingsContent from "./ProfileSettingsContent"


type Props = WithStyles<typeof styles>

const styles = createStyles({
    card: {
        flexGrow: 1
    },
    cardContent: {
        padding: 12,
        marginBottom: -12
    }
})

const ProfileSettings = ({classes}: Props) => (
    <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
            <ProfileSettingsContent />
        </CardContent>
        <Spacer />
        <LanguageSettings />
    </Card>
)

export default compose<Props, {}>(
    pure,
    withStyles(styles)
)(ProfileSettings)
