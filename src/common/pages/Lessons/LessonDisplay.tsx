import {
    createStyles,
    FormControl, FormLabel,
    Theme,
    Typography,
    withStyles,
    WithStyles
} from "@material-ui/core"
import {withTranslation, WithTranslation} from "react-i18next"
import {compose} from "recompose"
import {Card as GQLCard} from "../../../generated/graphql"
import * as React from "react"

interface PropTypes {
    card: GQLCard
}

type Props = PropTypes & WithStyles<typeof styles> & WithTranslation

const styles = (theme: Theme) => createStyles({
    lesson: {
        width: "100%",
        backgroundColor: theme.palette.primary.light,
        padding: theme.spacing.unit * 2,
        display: "flex",
        flexDirection: "column"
    },
    formControl: {
        margin: theme.spacing.unit * 0.5
    }
})

export const LessonDisplayRaw = ({t, classes, card}: Props) => (
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

export default compose<Props, PropTypes>(
    withStyles(styles),
    withTranslation()
)(LessonDisplayRaw)
