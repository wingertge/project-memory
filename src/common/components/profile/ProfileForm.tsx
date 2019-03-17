import {ApolloError} from "apollo-client"
import React from "react"
import {
    TextField,
    withStyles,
    Button,
    WithStyles,
    createStyles,
    Theme
} from "@material-ui/core"
import * as PropTypes from "prop-types"
import {withTranslation, WithTranslation} from "react-i18next"
import {compose, pure, withHandlers} from "recompose"
import {oc} from "ts-optchain"
import {GetProfile, UpdateProfile, UserInput} from "../../../generated-models"
import {
    FormWithErrors, MutationProps, ValidatorMap, withMutation,
    withState, withValidatedFormState
} from "../../enhancers"
import {isEmail, longerThan, noInvalidCharacters, notEmpty, shorterThan} from "../../util/validationUtils"
import ErrorBox from "../common/ErrorBox"
import Toast from "../common/Toast"
import PasswordChangeDialog from "./PasswordChangeDialog"
import _ from "lodash"
import User = GetProfile.User

const styles = (theme: Theme) => createStyles({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    form: {
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2
    }
})

interface PropTypes {
    profile: User,
    isSocial: boolean
}

interface StateProps {
    passwordChangeOpen: boolean
}

interface UpdaterProps {
    updatePasswordChangeOpen: (state: boolean) => boolean
    updateName: (state: string) => string
    updateUsername: (state: string) => string
    updateEmail: (state: string) => string
}

interface HandlerProps {
    openPasswordChange: () => void
    closePasswordChange: () => void
    onNameChange: (event) => void
    onUsernameChange: (event) => void
    onEmailChange: (event) => void
    submit: (variables: {sub: string, profile: Partial<UserInput>}) => void
    onSubmit: () => void
    closeToast: () => void
}

interface FormProps extends FormWithErrors<FormProps> {
    name: string,
    username: string,
    email: string
}

type Form = FormProps & UpdaterProps

type Props = WithStyles<typeof styles> & StateProps & UpdaterProps & HandlerProps & FormProps & PropTypes & MutationProps<UpdateProfile.Mutation, UpdateProfile.Variables> & WithTranslation

const ProfileForm = (
    {classes, profile, onSubmit, isSocial, passwordChangeOpen, openPasswordChange, closePasswordChange, onNameChange, onUsernameChange, onEmailChange, name, username, email, errors, loading, apolloResult, closeToast, apolloError, t}: Props
) => {
    return (
        <>
            {apolloError && <ErrorBox title={apolloError.message.split(":")[0].trim()} text={apolloError.message.split(":")[1].trim()} retry={onSubmit}/>}
            <form className={classes.form}>
                <TextField name="nickname" label={t("Username")} className={classes.textField} value={username}
                           onChange={onUsernameChange} error={!!(errors.username)}
                           helperText={t(errors.username!)}/>
                <TextField name="name" label={t("Name")} className={classes.textField} value={name} onChange={onNameChange}
                           error={!!(errors.name)} helperText={t(errors.name!)}/>
                <TextField name="email"
                           label={t("Email")}
                           className={classes.textField}
                           value={email}
                           onChange={onEmailChange}
                           disabled={isSocial}
                           helperText={isSocial ? t("Can't change email on a social connection login") : t(errors.email!)}
                           error={!!(errors.email)}/>
                <Button variant="outlined" color="primary" onClick={openPasswordChange}>{t("Change Password")}</Button>
                <PasswordChangeDialog sub={profile.sub} passwordExists={!isSocial} open={passwordChangeOpen} close={closePasswordChange} />
                <Button onClick={onSubmit} disabled={!!(loading || !_.isEmpty(errors))}>{loading ? "Saving..." : "Save"}</Button>
            </form>
            <Toast open={!!apolloResult} onClose={closeToast} message="Successfully updated profile"/>
        </>
    )
}

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

export {ProfileForm as RawProfileForm}

export default compose<Props, PropTypes>(
    pure,
    withStyles(styles),
    withTranslation("translations"),
    withState("passwordChangeOpen", "updatePasswordChangeOpen", false),
    withState<Props, ApolloError | undefined>("apolloError", "updateApolloError", undefined),
    withState<Props, UpdateProfile.Mutation | undefined>("apolloResult", "updateApolloResult", undefined),
    withValidatedFormState<Form, Props>(({profile}) => ({
        name: oc(profile).name(),
        username: oc(profile).username(),
        email: oc(profile).email()
    }), validators),
    withHandlers<Props, Partial<HandlerProps>>({
        openPasswordChange: ({updatePasswordChangeOpen}) => () => updatePasswordChangeOpen(true),
        closePasswordChange: ({updatePasswordChangeOpen}) => () => updatePasswordChangeOpen(false),
        closeToast: ({updateApolloResult}) => () => updateApolloResult(undefined),
        onSubmit: ({submit, profile, name, username, email}) => () => submit({sub: profile.sub, profile: {name, username, email}})
    }),
    withMutation<Props, UpdateProfile.Mutation, UpdateProfile.Variables>(UpdateProfile.Document, "submit")
)(ProfileForm)
