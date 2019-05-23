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

import {Typography} from "@material-ui/core"
import {createStyles, makeStyles} from "@material-ui/styles"
import * as React from "react"
import Helmet from "react-helmet"
import {useTranslation} from "react-i18next"
import NotFoundImg from "../assets/notfound.png"

const useStyles = makeStyles(createStyles({
    image: {
        width: 500
    }
}))

export const NotFound = () => {
    const classes = useStyles()
    const {t} = useTranslation()

    return (
        <div>
            <Helmet>
                <title>{t("Page not found - Project Memory")}</title>
            </Helmet>
            <Typography variant="h5">{t("I'm sorry Dave, I'm afraid I can't let you do that.")}</Typography>
            <img src={NotFoundImg} alt={t("Disappointed Tapir")} className={classes.image}/>
        </div>
    )
}

export default NotFound
