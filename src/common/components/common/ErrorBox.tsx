import React from "react"
import {Button, Card, CardContent, CardActions, createStyles, Theme, Typography, WithStyles, withStyles} from "@material-ui/core"
import {WithTranslation, withTranslation} from "react-i18next"
import {compose, pure} from "recompose"
import Heading from "./Heading"

const styles = (theme: Theme) => createStyles({
    errorBox: {
        backgroundColor: theme.palette.error.light + "33",
        borderColor: theme.palette.error.dark,
        borderWidth: 2,
        borderStyle: "solid"
    },
    cardContent: {
        padding: theme.spacing.unit * 0.5,
        paddingBottom: 0
    },
    cardActions: {
        padding: 0,
        display: "flex",
        justifyContent: "center"
    },
    retryButton: {
        color: theme.palette.error.main
    }
})

interface PropTypes {
    text: string
    title: string
    retry?: (event) => void
}

type Props = WithStyles<typeof styles> & PropTypes & WithTranslation

const ErrorBox = ({title, text, retry, classes, t}: Props) => (
    <Card className={classes.errorBox}>
        <CardContent className={classes.cardContent}>
            <Heading color="error">
                {title}
            </Heading>
            <Typography variant="body1" gutterBottom color="error">
                {text}
            </Typography>
        </CardContent>
        {retry &&
        <CardActions className={classes.cardActions}>
            <Button onClick={retry} className={classes.retryButton}>{t("Retry")}</Button>
        </CardActions>}
    </Card>
)

export default compose<Props, PropTypes>(
    pure,
    withStyles(styles),
    withTranslation()
)(ErrorBox)
