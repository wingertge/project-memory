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
