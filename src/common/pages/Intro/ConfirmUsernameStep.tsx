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

import {Button, Grid, TextField, Theme, Typography} from "@material-ui/core"
import {createStyles, makeStyles} from "@material-ui/styles"
import * as React from "react"
import Helmet from "react-helmet"
import {useTranslation} from "react-i18next"
import {oc} from "ts-optchain"
import {useUpdateProfileMutation} from "../../../generated/graphql"
import {useUser, useValidatedFormState} from "../../hooks"
import {usernameValidator} from "../../util/validators"

interface Form {
    username: string
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    form: {
        width: "100%"
    },
    formItem: {
        width: "calc(100% - 32px)",
        maxWidth: 600
    },
    textField: {
        margin: theme.spacing(2),
        marginTop: theme.spacing(3),
        width: "100%"
    }
}))

export const ConfirmUsernameStep = () => {
    const classes = useStyles()
    const {t} = useTranslation()
    const user = useUser()
    const {username} = useValidatedFormState<Form>({username: oc(user).username("")}, {username: usernameValidator})
    const [save] = useUpdateProfileMutation({
        variables: {
            id: user && user.id,
            profile: {
                username: username.value,
                introStep: 4
            }
        }
    })

    return (
        <>
            <Helmet>
                <title>{t("Confirm your username - Project Memory")}</title>
            </Helmet>
            <Typography variant="h6">
                {t("Fantastic! Just double check your automatically assigned username and change it if you don't want it to represent you in the Project Memory community (don't worry, I won't judge about that weird email address).")}
            </Typography>
            <Grid container direction="column" justify="flex-end" alignItems="center" className={classes.form}>
                <Grid item xs className={classes.formItem}>
                    <TextField label={t("Username")} onChange={username.onChange} value={username.value}
                               className={classes.textField}/>
                </Grid>
                <Grid item xs className={classes.formItem}>
                    <Button variant="contained" color="primary" onClick={() => save()}>{t("Confirm")}</Button>
                </Grid>
            </Grid>
        </>
    )
}

export default ConfirmUsernameStep
