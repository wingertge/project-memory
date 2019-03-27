import {
    Card, CardContent,
    createStyles,
    Theme,
    withStyles,
    WithStyles
} from "@material-ui/core"
import * as React from "react"
import {compose, pure} from "recompose"
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
    </Card>
)

export default compose<Props, {}>(
    pure,
    withStyles(styles)
)(ProfileSettings)
