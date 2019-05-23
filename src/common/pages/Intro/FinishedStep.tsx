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
import {oc} from "ts-optchain"
import {useUpdateProfileMutation} from "../../../generated/graphql"
import {useUser} from "../../hooks"

const useStyles = makeStyles((theme: Theme) => createStyles({
    button: {
        marginTop: theme.spacing(4)
    }
}))

export const FinishedStep = () => {
    const classes = useStyles()
    const {t} = useTranslation()
    const user = useUser()
    const [mutate] = useUpdateProfileMutation({
        variables: {
            id: oc(user).id(""),
            profile: {
                introStep: -1
            }
        }
    })
    const save = () => mutate().then(() => navigate("/"))

    return (
        <>
            <Helmet>
                <title>{t("Ready for Project Memory")}</title>
            </Helmet>
            <Typography variant="h6">
                {t("Aaand - Done! You're good to go now, enjoy Project Memory! If you have any more questions feel free to look at the help section and ask questions on the help board there.")}
            </Typography>
            <Button variant="contained" color="primary" onClick={save} className={classes.button}>{t("Will do!")}</Button>
        </>
    )
}

export default FinishedStep
