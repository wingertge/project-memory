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

import {Button, Grid, Hidden, TextField, Theme, Typography} from "@material-ui/core"
import {createStyles, makeStyles} from "@material-ui/styles"
import {useState} from "react"
import * as React from "react"
import {useTranslation} from "react-i18next"
import {oc} from "ts-optchain"
import {useUpdateProfileMutation} from "../../../../generated/graphql"
import {useToast, useUser, useValidatedFormState, ValidatorMap} from "../../../hooks"
import {isEmail, notEmpty, shorterThan} from "../../../util/validationUtils"
import {usernameValidator} from "../../../util/validators"
import ApolloErrorBox from "../../../components/apollo/ApolloErrorBox"
import {TimedCircularProgress} from "../../../components/apollo/TimedCircularProgress"
import PasswordChangeDialog from "../PasswordChangeDialog"
import ProfilePictureSelector from "./ProfilePictureSelector"

interface Form {
    name: string,
    username: string,
    email: string
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    textField: {
        margin: theme.spacing(0.5, 0),
        width: "100%"
    },
    container: {
        display: "flex",
        flexDirection: "row",
        width: "100%"
    },
    mobileRoot: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    form: {
        padding: theme.spacing(1.5)
    },
    buttonContainer: {
        height: 47.2,
        margin: theme.spacing(0.5, 0, -0.5, 0)
    },
    header: {
        textAlign: "left",
        padding: 12
    },
    formWrapper: {
        paddingLeft: theme.spacing(1)
    },
    mobileFormWrapper: {
        display: "flex",
        flexDirection: "column",
        paddingLeft: theme.spacing(1),
        flex: "1 1 100%"
    },
    button: {
        [theme.breakpoints.down("xs")]: {
            marginTop: theme.spacing(1)
        }
    }
}))

const validators: ValidatorMap<Form> = {
    username: usernameValidator,
    name: [
        {fun: notEmpty, message: "Name can't be empty"},
        {fun: shorterThan(101), message: "Name can't be longer than 100 characters"}
    ],
    email: [
        {fun: notEmpty, message: "Email is required"},
        {fun: isEmail, message: "Invalid email"}
    ]
}

export const ProfileSettingsContent = () => {
    const classes = useStyles()
    const {t} = useTranslation()
    const user = useUser()

    const {username, name, email, valid} = useValidatedFormState<Form>({
        email: oc(user).email()!,
        name: oc(user).name()!,
        username: oc(user).username()!
    }, validators)

    const [passwordChangeOpen, setPasswordChangeOpen] = useState(false)

    const {Toast, openToast} = useToast("Successfully updated profile")

    const [updateProfile, {loading: saving, error}] = useUpdateProfileMutation()

    const submit = () => {
        updateProfile({
            variables: {
                id: user.id,
                profile: {
                    name: name.value,
                    username: username.value,
                    email: email.value
                }
            }
        }).then(openToast)
    }

    if(!user) return <TimedCircularProgress />

    return (
        <>
            <Toast/>
            {error && <ApolloErrorBox error={error} retry={submit}/>}
            <PasswordChangeDialog id={user.id} passwordExists={!user.isSocial}
                                  open={passwordChangeOpen}
                                  close={() => setPasswordChangeOpen(false)}/>
            <Hidden xsDown implementation="css">
                <div className={classes.container}>
                    <ProfilePictureSelector/>
                    <Grid container direction="column" justify="space-between" alignItems="stretch"
                          className={classes.formWrapper}>
                        <Grid item className={classes.header}>
                            <Typography variant="h5">{t("Profile")}</Typography>
                        </Grid>
                        <Grid item container direction="row" justify="flex-end" alignItems="stretch" className={classes.form} spacing={3}>
                            <Grid item xs container direction="column" justify="flex-end" alignItems="stretch">
                                <Grid item xs>
                                    <TextField name="nickname" label={t("Username")} className={classes.textField}
                                               value={username.value}
                                               onChange={username.onChange} error={!!username.error}
                                               helperText={t(username.error!)}/>
                                </Grid>
                                <Grid item xs>
                                    <TextField name="email"
                                               label={t("Email")}
                                               className={classes.textField}
                                               value={email.value}
                                               onChange={email.onChange}
                                               disabled={user.isSocial}
                                               helperText={user.isSocial ? t("Can't change email on a social connection login") : t(email.error!)}
                                               error={!!email.error}/>
                                </Grid>
                            </Grid>
                            <Grid item xs container direction="column" justify="flex-end" alignItems="stretch">
                                <Grid item xs>
                                    <TextField name="name" label={t("Name")} className={classes.textField}
                                               value={name.value}
                                               onChange={name.onChange}
                                               error={!!name.error} helperText={t(name.error!)}/>
                                </Grid>
                                <Grid item xs container direction="row" justify="space-between" alignItems="flex-end" className={classes.buttonContainer} spacing={1}>
                                    <Grid item xs={8}>
                                        <Button variant="outlined" color="primary"
                                                onClick={() => setPasswordChangeOpen(true)}
                                                fullWidth>
                                            {t("Change Password")}
                                        </Button>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Button onClick={submit} disabled={(saving || !valid)}
                                                variant="contained" color="primary" fullWidth>
                                            {saving ? "Saving..." : "Save"}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </Hidden>
            <Hidden smUp implementation="css">
                <div className={classes.mobileRoot}>
                    <Typography variant="h5">{t("Profile")}</Typography>
                    <div className={classes.container}>
                        <ProfilePictureSelector/>
                        <div className={classes.mobileFormWrapper}>
                            <TextField name="nickname" label={t("Username")} className={classes.textField}
                                       value={username.value}
                                       onChange={username.onChange} error={!!username.error}
                                       helperText={username.error}/>
                            <TextField name="email"
                                       label={t("Email")}
                                       className={classes.textField}
                                       value={email.value}
                                       onChange={email.onChange}
                                       disabled={user.isSocial}
                                       helperText={user.isSocial ? t("Can't change email on a social connection login") : email.error}
                                       error={!!email.error}/>
                            <TextField name="name" label={t("Name")} className={classes.textField}
                                       value={name.value}
                                       onChange={name.onChange}
                                       error={!!name.error} helperText={name.error}/>
                        </div>
                    </div>
                    <Button variant="outlined" color="primary"
                            onClick={() => setPasswordChangeOpen(true)}
                            fullWidth className={classes.button}>
                        {t("Change Password")}
                    </Button>
                    <Button onClick={submit} disabled={(saving || !valid)}
                            variant="contained" color="primary" fullWidth className={classes.button}>
                        {saving ? "Saving..." : "Save"}
                    </Button>
                </div>
            </Hidden>
        </>
    )

}

export default ProfileSettingsContent
