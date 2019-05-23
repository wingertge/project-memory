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
