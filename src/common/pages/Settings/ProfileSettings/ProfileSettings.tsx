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
    Card, CardContent
} from "@material-ui/core"
import {createStyles, makeStyles} from "@material-ui/styles"
import * as React from "react"
import {Theme} from "../../../theme"
import LanguageSettings from "../LanguageSettings"
import ProfileSettingsContent from "./ProfileSettingsContent"

const useStyles = makeStyles((theme: Theme) => createStyles({
    card: {
        flexGrow: 1
    },
    cardContent: {
        padding: 12,
        marginBottom: -12
    },
    spacer: {
        height: theme.spacing(1)
    }
}))

export const ProfileSettings = () => {
    const classes = useStyles()

    return (
        <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
                <ProfileSettingsContent />
            </CardContent>
            <div className={classes.spacer}/>
            <LanguageSettings />
        </Card>
    )
}

export default ProfileSettings
