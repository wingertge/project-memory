import {createStyles, makeStyles} from "@material-ui/styles"
import React from "react"
import {Button, Card, CardContent, CardActions, Theme, Typography} from "@material-ui/core"
import {useTranslation} from "react-i18next"
import Heading from "./Heading"

const useStyles = makeStyles((theme: Theme) => createStyles({
    errorBox: {
        backgroundColor: theme.palette.error.light + "33",
        borderColor: theme.palette.error.dark,
        borderWidth: 2,
        borderStyle: "solid"
    },
    cardContent: {
        padding: theme.spacing(0.5, 0.5, 0.5, 0)
    },
    cardActions: {
        padding: 0,
        display: "flex",
        justifyContent: "center"
    },
    retryButton: {
        color: theme.palette.error.main
    }
}))

interface PropTypes {
    text: string
    title: string
    retry?: (event) => void
}

export const ErrorBox = ({title, text, retry}: PropTypes) => {
    const classes = useStyles()
    const {t} = useTranslation()
    return (
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
}

export default ErrorBox
