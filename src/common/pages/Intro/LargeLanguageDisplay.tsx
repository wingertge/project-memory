import {Avatar, Theme, Typography, Zoom} from "@material-ui/core"
import {createStyles, makeStyles} from "@material-ui/styles"
import * as React from "react"
import {useTranslation} from "react-i18next"
import {Language} from "../../../generated/graphql"

interface PropTypes {
    language?: Language
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        position: "relative",
        width: 220,
        height: 60,
        marginLeft: theme.spacing(1)
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
        marginLeft: theme.spacing(1)
    }
}))

export const LargeLanguageDisplay = ({language}: PropTypes) => {
    const classes = useStyles()
    const {t} = useTranslation()

    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <Avatar src="" className={classes.languageIcon}/>
                <div className={classes.languageName}/>
            </div>
            {language && (
                <Zoom in={true} timeout={300}>
                    <div className={classes.container}>
                        <Avatar src={`/static/media/flags/${language.languageCode}.png`}
                                className={classes.languageIcon}/>
                        <Typography variant="body1" className={classes.languageName}>
                            {`${t(language.name)} (${language.nativeName})`}
                        </Typography>
                    </div>
                </Zoom>
            )}
        </div>
    )
}

export default LargeLanguageDisplay
