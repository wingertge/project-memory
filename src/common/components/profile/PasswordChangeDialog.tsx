import {ApolloError} from "apollo-client"
import React from "react"
import {
    withStyles,
    WithStyles,
    createStyles,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText, TextField, DialogActions, Button
} from "@material-ui/core"
import {compose, lifecycle, pure, withHandlers} from "recompose"
import {UpdateProfile, UserInput} from "../../../generated-models"
import {
    FormWithErrors,
    MutationProps,
    ValidatorMap,
    withMutation,
    withState,
    withValidatedFormState
} from "../../enhancers"
import {isEqualTo, passwordStrongEnough} from "../../util/validationUtils"
import ErrorBox from "../common/ErrorBox"
import Toast from "../common/Toast"
import {WithTranslation, withTranslation} from "react-i18next"

const styles = createStyles({})

interface PropTypes {
    passwordExists: boolean
    open: boolean
    close: () => void
    sub: string
}

interface FormState {
    oldPassword: string
    newPassword: string
    newPasswordConfirm: string
}

interface UpdaterProps {
    updateOldPassword: (state: string) => string
    updateNewPassword: (state: string) => string
    updateNewPasswordConfirm: (state: string) => string
}

interface ToastProps {
    closeToast: () => void
}

interface HandlerProps {
    onOldPasswordChange: (event) => void
    onNewPasswordChange: (event) => void
    onNewPasswordConfirmChange: (event) => void
    save: (variables: {sub: string, profile: Partial<UserInput>}) => void
    onSave: () => void
}

type Form = FormState & UpdaterProps & HandlerProps & FormWithErrors<FormState> & ToastProps

type Props = WithStyles<typeof styles> & Form & PropTypes & MutationProps<UpdateProfile.Mutation, UpdateProfile.Variables> & WithTranslation

const PasswordChangeDialog = (
    {sub, open, passwordExists, close, onSave, oldPassword, onOldPasswordChange, newPassword, onNewPasswordChange, newPasswordConfirm, onNewPasswordConfirmChange, errors, closeToast, apolloError, apolloResult, loading, t}: Props
) => {
    return (
        <>
            <Dialog open={open} onClose={close} aria-labelledby="form-dialog-title">
                <DialogTitle>{passwordExists ? t("Change Password") : t("Create Password")}</DialogTitle>
                <DialogContent>
                    {apolloError && <ErrorBox title={t(apolloError.message.split(":")[0].trim())} text={t(apolloError.message.split(":")[1].trim())} retry={onSave}/>}
                    <DialogContentText>
                        {passwordExists ? t("Please enter a new password") : t("Please enter a password")}
                    </DialogContentText>
                    {passwordExists && <TextField
                        autoFocus
                        margin="dense"
                        name="oldPassword"
                        label={t("Old Password")}
                        type="password"
                        fullWidth
                        onChange={onOldPasswordChange}
                        error={!!(errors.oldPassword)}
                        helperText={t(errors.oldPassword!)}
                    />}
                    <TextField
                        autoFocus={!passwordExists}
                        margin="dense"
                        name="newPassword"
                        label={passwordExists ? t("New Password") : t("Password")}
                        type="password" fullWidth onChange={onNewPasswordChange}
                        error={!!(errors.newPassword)}
                        helperText={t(errors.newPassword!)}
                    />
                    <TextField
                        margin="dense"
                        name="newPasswordConfirm"
                        label={passwordExists ? t("Confirm New Password") : t("Confirm Password")}
                        type="password"
                        fullWidth
                        onChange={onNewPasswordConfirmChange}
                        error={!!(errors.newPasswordConfirm)}
                        helperText={t(errors.newPasswordConfirm!)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={close} color="primary">
                        {t("Cancel")}
                    </Button>
                    <Button onClick={onSave} color="primary" disabled={loading}>
                        {t("Save")}
                    </Button>
                </DialogActions>
            </Dialog>
            <Toast open={!!apolloResult} onClose={closeToast}
                   message={passwordExists ? t("Successfully changed password") : t("Successfully added a password")}/>
        </>
    )
}

const validators: ValidatorMap<FormState> = {
    newPassword: [
        {fun: passwordStrongEnough(), message: "Password needs to be stronger"}
    ],
    newPasswordConfirm: [
        {fun: isEqualTo<FormState>("newPassword"), message: "Passwords don't match"}
    ]
}

export {PasswordChangeDialog as RawPasswordChangeDialog}

export default compose<Props, PropTypes>(
    pure,
    withStyles(styles),
    withTranslation(),
    withValidatedFormState<Form, Props>({
        oldPassword: "",
        newPassword: "",
        newPasswordConfirm: ""
    }, validators),
    withState<Props, ApolloError | undefined>("apolloError", "updateApolloError", undefined),
    withState<Props, UpdateProfile.Mutation | undefined>("apolloResult", "updateApolloResult", undefined),
    withMutation<Props, UpdateProfile.Mutation, UpdateProfile.Variables>(UpdateProfile.Document, "save"),
    withHandlers<Props, Partial<HandlerProps & MutationProps<UpdateProfile.Mutation, UpdateProfile.Variables>>>({
        closeToast: ({updateApolloResult}) => () => updateApolloResult(undefined),
        onSave: ({save, sub, newPassword, oldPassword}) => () => save({sub, profile: {password: newPassword, oldPassword}})
    }),
    lifecycle<Props, {}>({
        componentWillReceiveProps(nextProps) {
            if(!this.props.apolloResult && nextProps.apolloResult)
                this.props.close()
        }
    })
)(PasswordChangeDialog)
