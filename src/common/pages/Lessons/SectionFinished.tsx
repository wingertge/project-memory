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

import {Button, Theme, Typography} from "@material-ui/core"
import {createStyles, makeStyles} from "@material-ui/styles"
import {navigate} from "@reach/router"
import * as React from "react"
import Helmet from "react-helmet"
import {useTranslation} from "react-i18next"
import Checkmark from "../../assets/checkmark.png"

interface PropTypes {
    onMoreLessonsClick: () => void
    lessonCount: number
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    all: {
        margin: theme.spacing(1, 1, 1, 2)
    },
    image: {
        width: 250,
        margin: theme.spacing(0, 2)
    }
}))

export const SectionFinished = ({lessonCount, onMoreLessonsClick}: PropTypes) => {
    const classes = useStyles()
    const {t} = useTranslation()

    return (
        <div>
            <Helmet>
                <title>{t("Finished some Lessons - Project Memory")}</title>
            </Helmet>
            <Typography variant="h5" className={classes.all}>{t("Done!")}</Typography>
            <img src={Checkmark} alt={t("Done")} className={classes.image}/>
            <Typography variant="body1" className={classes.all}>
                {t("You can do more lessons, or go back to the home page.")}
            </Typography>
            <Button onClick={() => navigate("/")} className={classes.all}>{t("Home")}</Button>
            <Button disabled={lessonCount === 0}
                    title={lessonCount === 0 ? t("No more lessons available") : undefined}
                    onClick={onMoreLessonsClick}
                    className={classes.all}>
                {t("More lessons")}
            </Button>
        </div>
    )
}

export default SectionFinished
