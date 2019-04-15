import {
    FormControl, FormLabel,
    Theme,
    Typography
} from "@material-ui/core"
import {createStyles, makeStyles} from "@material-ui/styles"
import {useTranslation} from "react-i18next"
import {Card} from "../../../generated/graphql"
import * as React from "react"

interface PropTypes {
    card: Card
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    lesson: {
        width: "100%",
        backgroundColor: theme.palette.primary.light,
        padding: theme.spacing(2),
        display: "flex",
        flexDirection: "column"
    },
    formControl: {
        margin: theme.spacing(0.5)
    }
}))

export const LessonDisplay = ({card}: PropTypes) => {
    const classes = useStyles()
    const {t} = useTranslation()

    return (
        <div className={classes.lesson}>
            <FormControl className={classes.formControl}>
                <FormLabel>{t("Meaning")}</FormLabel>
                <Typography variant="h5">{card.meaning}</Typography>
            </FormControl>
            {card.pronunciation && (
                <FormControl className={classes.formControl}>
                    <FormLabel>{t("Pronunciation")}</FormLabel>
                    <Typography variant="h5">{card.pronunciation}</Typography>
                </FormControl>
            )}
            <FormControl className={classes.formControl}>
                <FormLabel>{t("Translation")}</FormLabel>
                <Typography variant="h5">{card.translation}</Typography>
            </FormControl>
        </div>
    )
}

export default LessonDisplay
