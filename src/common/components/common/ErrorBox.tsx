import React from "react"
import {Button, Card, CardContent, CardActions, createStyles, Theme, Typography, WithStyles, withStyles} from "@material-ui/core"
import {WithTranslation, withTranslation} from "react-i18next"
import {compose} from "recompose"
import Heading from "./Heading"

const styles = (theme: Theme) => createStyles({
    errorBox: {
        backgroundColor: theme.palette.error.light,
        borderColor: theme.palette.error.dark,
        borderWidth: 2,
        borderStyle: "solid"
    },
    cardContent: {
        paddingBottom: 0
    }
})

interface PropTypes {
    text: string
    title: string
    retry?: (event) => void
}

type Props = WithStyles<typeof styles> & PropTypes & WithTranslation

function ErrorBox({title, text, retry, classes, t}: Props) {
    return (
        <Card className={classes.errorBox}>
            <CardContent className={classes.cardContent}>
                <Heading>
                    {title}
                </Heading>
                <Typography variant="body1" gutterBottom>
                    {text}
                </Typography>
            </CardContent>
            {retry &&
            <CardActions>
                <Button onClick={retry}>{t("Retry")}</Button>
            </CardActions>}
        </Card>
    )
}

export default compose<Props, PropTypes>(
    withStyles(styles),
    withTranslation()
)(ErrorBox)
