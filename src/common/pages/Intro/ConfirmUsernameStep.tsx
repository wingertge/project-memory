import {Button, createStyles, Grid, TextField, Theme, Typography, withStyles, WithStyles} from "@material-ui/core"
import * as React from "react"
import {withTranslation, WithTranslation} from "react-i18next"
import {compose} from "recompose"
import {oc} from "ts-optchain"
import {UpdateProfileDocument, UpdateProfileMutation, UpdateProfileMutationVariables} from "../../../generated/graphql"
import {withFormState, WithMutation, withMutation, WithUser, withUser} from "../../enhancers"

interface FormTypes {
    username: string
}

interface FormHandlerTypes {
    onUsernameChange: (event) => void
}

type Form = FormTypes & FormHandlerTypes
type Props = WithTranslation & WithUser & Form & WithStyles<typeof styles> & WithMutation

const styles = (theme: Theme) => createStyles({
    form: {
        width: "100%"
    },
    formItem: {
        width: "calc(100% - 32px)",
        maxWidth: 600
    },
    textField: {
        margin: theme.spacing.unit * 2,
        marginTop: theme.spacing.unit * 3,
        width: "100%"
    },
    button: {
        //display: "block"
    }
})

export const ConfirmUsernameStepRaw = ({classes, t, username, onUsernameChange, submitMutation}: Props) => (
    <>
        <Typography variant="h6">
            {t("Fantastic! Just double check your automatically assigned username and change it if you don't want it to represent you in the Project Memory community (don't worry, I won't judge about that weird email address).")}
        </Typography>
        <Grid container direction="column" justify="flex-end" alignItems="center" className={classes.form}>
            <Grid item xs className={classes.formItem}>
                <TextField label={t("Username")} onChange={onUsernameChange} value={username} className={classes.textField} />
            </Grid>
            <Grid item xs className={classes.formItem}>
                <Button variant="contained" color="primary" className={classes.button} onClick={submitMutation}>{t("Confirm")}</Button>
            </Grid>
        </Grid>
    </>
)

export default compose<Props, {}>(
    withStyles(styles),
    withTranslation(),
    withUser(),
    withFormState<FormTypes, Props>(({user}) => ({username: oc(user).username("")})),
    withMutation<Props, UpdateProfileMutation, UpdateProfileMutationVariables>(UpdateProfileDocument, ({user, username}) => ({
        id: user.id,
        profile: {
            username,
            introStep: 4
        }
    }))
)(ConfirmUsernameStepRaw)
