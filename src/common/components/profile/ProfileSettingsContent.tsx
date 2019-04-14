import {
    Button,
    CircularProgress,
    Divider,
    Grid,
    TextField,
    Theme
} from "@material-ui/core"
import {createStyles, withStyles, WithStyles} from "@material-ui/styles"
import * as React from "react"
import {WithTranslation, withTranslation} from "react-i18next"
import {compose, pure, withHandlers} from "recompose"
import {oc} from "ts-optchain"
import {
    UpdateProfileDocument,
    UpdateProfileMutation as Mutation,
    UpdateProfileMutationVariables as Variables
} from "../../../generated/graphql"
import {
    FormWithErrors, MutateFn, MutationProps,
    renderWhileLoading,
    ValidatorMap, withErrorBox, withMutation, withState, WithToast, withToast,
    withUser,
    WithUser,
    withValidatedFormState
} from "../../enhancers"
import {isEmail, longerThan, noInvalidCharacters, notEmpty, shorterThan} from "../../util/validationUtils"
import Heading from "../common/Heading"
import PasswordChangeDialog from "./PasswordChangeDialog"
import _ from "lodash"
import ProfilePictureSelector from "./ProfilePictureSelector"

interface FormProps {
    name: string,
    username: string,
    email: string
}

interface HandlerProps {
    openPasswordChange: () => void
    closePasswordChange: () => void
    onNameChange: (event) => void
    onUsernameChange: (event) => void
    onEmailChange: (event) => void
    submit: MutateFn<Mutation, Variables>
    onSubmit: () => void
    onSaved: () => void
}

interface UpdaterProps {
    updatePasswordChangeOpen: (state: boolean) => boolean
    updateName: (state: string) => string
    updateUsername: (state: string) => string
    updateEmail: (state: string) => string
}

interface StateProps {
    passwordChangeOpen: boolean
}

type Form = FormProps & FormWithErrors<FormProps> & UpdaterProps

type Props = Form & StateProps & HandlerProps & WithUser & WithStyles<typeof styles> & WithTranslation & MutationProps<Mutation, Variables> & WithToast

const styles = (theme: Theme) => createStyles({
    textField: {
        margin: theme.spacing(0.5, 0),
        width: "100%"
    },
    container: {
        display: "flex",
        flexDirection: "row"
    },
    form: {
        padding: theme.spacing(0, 1.5, 1.5, 1.5)
    },
    buttonContainer: {
        height: 47.2,
        margin: theme.spacing(0, 0.5, 0, -0.5)
    },
    header: {
        textAlign: "left",
        padding: 12
    },
    formWrapper: {
        paddingLeft: theme.spacing(1)
    }
})

const loading = false
const ProfileSettings = ({t, classes, user, errors, username, email, name, onUsernameChange, onEmailChange, onNameChange, openPasswordChange, passwordChangeOpen, closePasswordChange, onSubmit}: Props) => (
    <div className={classes.container}>
        <ProfilePictureSelector user={user}/>
        <Divider />
        <Grid container direction="column" justify="space-between" alignItems="stretch" className={classes.formWrapper}>
            <Grid item className={classes.header}>
                <Heading>{t("Profile")}</Heading>
            </Grid>
            <Grid item>
                <Grid container direction="row" justify="flex-end" alignItems="stretch" className={classes.form} spacing={3}>
                    <Grid item xs>
                        <Grid container direction="column" justify="flex-end" alignItems="stretch">
                            <Grid item xs>
                                <TextField name="nickname" label={t("Username")} className={classes.textField} value={username}
                                           onChange={onUsernameChange} error={!!(errors.username)}
                                           helperText={t(errors.username!)}/>
                            </Grid>
                            <Grid item xs>
                                <TextField name="email"
                                           label={t("Email")}
                                           className={classes.textField}
                                           value={email}
                                           onChange={onEmailChange}
                                           disabled={user.isSocial}
                                           helperText={user.isSocial ? t("Can't change email on a social connection login") : t(errors.email!)}
                                           error={!!(errors.email)} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs>
                        <Grid container direction="column" justify="flex-end" alignItems="stretch">
                            <Grid item xs>
                                <TextField name="name" label={t("Name")} className={classes.textField} value={name}
                                           onChange={onNameChange}
                                           error={!!(errors.name)} helperText={t(errors.name!)}/>
                            </Grid>
                            <Grid item xs>
                                <Grid container direction="row" justify="space-between" alignItems="flex-end" className={classes.buttonContainer} spacing={8}>
                                    <Grid item xs={8}>
                                        <Button variant="outlined" color="primary" onClick={openPasswordChange} fullWidth>
                                            {t("Change Password")}
                                        </Button>
                                        <PasswordChangeDialog id={user.id} passwordExists={!user.isSocial} open={passwordChangeOpen}
                                                              close={closePasswordChange}/>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Button onClick={onSubmit} disabled={(loading || !_.isEmpty(errors))} variant="contained" color="primary" fullWidth>
                                            {loading ? "Saving..." : "Save"}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </div>
)

const validators: ValidatorMap<FormProps> = {
    username: [
        {fun: notEmpty, message: "Username can't be empty"},
        {fun: noInvalidCharacters(), message: "Please don't use unicode characters that break display. Thank you."},
        {fun: longerThan(2), message: "Must be at least 3 characters long"},
        {fun: shorterThan(25), message: "Must be 18 characters or less"}
    ],
    name: [
        {fun: notEmpty, message: "Name can't be empty"}
    ],
    email: [
        {fun: notEmpty, message: "Email is required"},
        {fun: isEmail, message: "Invalid email"}
    ]
}

export default compose<Props, {}>(
    pure,
    withStyles(styles),
    withTranslation(),
    withUser(),
    withToast("Successfully updated profile"),
    withState("passwordChangeOpen", "updatePasswordChangeOpen", false),
    withValidatedFormState<Form, Props>(({user}) => ({
        name: oc(user).name()!,
        username: oc(user).username()!,
        email: oc(user).email()!
    }), validators),
    renderWhileLoading(CircularProgress),
    withHandlers<Props, Partial<HandlerProps>>({
        openPasswordChange: ({updatePasswordChangeOpen}) => () => updatePasswordChangeOpen(true),
        closePasswordChange: ({updatePasswordChangeOpen}) => () => updatePasswordChangeOpen(false),
        onSaved: ({openToast}) => () => openToast()
    }),
    withMutation<Props, Mutation, Variables>(UpdateProfileDocument, "submit", "onSaved"),
    withHandlers<Props, Partial<HandlerProps>>({
        onSubmit: ({submit, user, name, username, email}) => () => submit({
            id: user.id,
            profile: {name, username, email}
        })
    }),
    withErrorBox("onSubmit", "mutationData")
)(ProfileSettings)
