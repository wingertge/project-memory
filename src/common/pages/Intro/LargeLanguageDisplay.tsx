import {Avatar, createStyles, Theme, Typography, withStyles, WithStyles, Zoom} from "@material-ui/core"
import * as React from "react"
import {withTranslation, WithTranslation} from "react-i18next"
import {compose, pure} from "recompose"
import {Language} from "../../../generated/graphql"

interface PropTypes {
    language?: Language
}

type Props = WithTranslation & PropTypes & WithStyles<typeof styles>

const styles = (theme: Theme) => createStyles({
    root: {
        position: "relative",
        width: 220,
        height: 60
    },
    container: {
        backgroundColor: theme.palette.background.paper,
        borderRadius: 30,
        position: "absolute",
        top: 0,
        left: 0,
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    languageIcon: {
        width: 60,
        height: 60
    },
    languageName: {
        width: 160,
        textAlign: "start",
        marginLeft: theme.spacing.unit
    }
})

export const LargeLanguageDisplayRaw = ({t, classes, language}: Props) => (
    <div className={classes.root}>
        <div className={classes.container}>
            <Avatar src="" className={classes.languageIcon} />
            <div className={classes.languageName} />
        </div>
        {language && (
            <Zoom in={true} timeout={300}>
                <div className={classes.container}>
                    <Avatar src={`/static/media/flags/${language.languageCode}.png`} className={classes.languageIcon} />
                    <Typography variant="body1" className={classes.languageName}>
                        {`${t(language.name)} (${language.nativeName})`}
                    </Typography>
                </div>
            </Zoom>
        )}
    </div>
)

export default compose<Props, PropTypes>(
    pure,
    withStyles(styles),
    withTranslation()
)(LargeLanguageDisplayRaw)
