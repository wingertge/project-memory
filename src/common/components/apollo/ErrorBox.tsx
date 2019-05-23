/*
The following is the license for the Project Memory Frontend, a frontend for the Project Memory web app.
Copyright (C) 2019  Genna Wingert

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

import {createStyles, makeStyles} from "@material-ui/styles"
import React from "react"
import {Button, Card, CardContent, CardActions, Theme, Typography} from "@material-ui/core"
import {useTranslation} from "react-i18next"

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
                <Typography variant="h5" color="error">
                    {title}
                </Typography>
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
