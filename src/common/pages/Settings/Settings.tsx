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

import {Theme} from "@material-ui/core"
import {createStyles, makeStyles} from "@material-ui/styles"
import React from "react"
import Helmet from "react-helmet"
import {useTranslation} from "react-i18next"
import DecksOverview from "./DecksOverview"
import ProfileSettings from "./ProfileSettings"

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        display: "flex"
    },
    settingsBox: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        padding: theme.spacing(0, 2)
    },
    spacer: {
        height: theme.spacing(2)
    },
    toolbar: theme.mixins.toolbar
}))

export const Settings = () => {
    const classes = useStyles()
    const {t} = useTranslation()

    return (
        <div className={classes.root}>
            <Helmet>
                <title>{t("Settings - Project Memory")}</title>
            </Helmet>
            <div className={classes.settingsBox}>
                <ProfileSettings />
                <div className={classes.spacer} />
                <DecksOverview />
            </div>
        </div>
    )
}

export default Settings
