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
import {compose, pure, withHandlers} from "recompose"
import {
    UpdateProfileDocument,
    UpdateProfileMutation as Mutation,
    UpdateProfileMutationVariables as MutationVariables
} from "../../../generated/graphql"
import {
    FormWithErrors, MutateFn,
    MutationProps,
    ValidatorMap,
    withMutation,
    WithToast, withToast,
    withValidatedFormState
} from "../../enhancers"
import {isEqualTo, passwordStrongEnough} from "../../util/validationUtils"
import {WithTranslation, withTranslation} from "react-i18next"
import WithErrorBox from "../common/WithErrorBox"

const styles = createStyles({})

interface PropTypes {
    passwordExists: boolean
    open: boolean
    close: () => void
    id: string
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
    save: MutateFn<Mutation, MutationVariables>
    onSave: () => void
    onSuccess: () => void
}

type Form = FormState & UpdaterProps & HandlerProps & FormWithErrors<FormState> & ToastProps

type Props = WithStyles<typeof styles> & Form & PropTypes & MutationProps<Mutation, MutationVariables> & WithTranslation & WithToast

const PasswordChangeDialog = (
    {open, passwordExists, close, onSave, oldPassword, onOldPasswordChange, newPassword, onNewPasswordChange, newPasswordConfirm, onNewPasswordConfirmChange, errors, mutationData, t}: Props
) => (
    <>
        <Dialog open={open} onClose={close} aria-labelledby="form-dialog-title">
            <DialogTitle>{passwordExists ? t("Change Password") : t("Create Password")}</DialogTitle>
            <DialogContent>
                <WithErrorBox prop={mutationData} retry={onSave}>
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
                </WithErrorBox>
            </DialogContent>
            <DialogActions>
                <Button onClick={close} color="primary">
                    {t("Cancel")}
                </Button>
                <Button onClick={onSave} color="primary" disabled={mutationData.saving}>
                    {t("Save")}
                </Button>
            </DialogActions>
        </Dialog>
    </>
)

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
    withToast<Props>(({passwordExists}) => passwordExists ? "Successfully changed password" : "Successfully added a password"),
    withHandlers<Props, Partial<HandlerProps>>({
        onSuccess: ({openToast, close}) => () => {
            openToast()
            close()
        }
    }),
    withMutation<Props, Mutation, MutationVariables>(UpdateProfileDocument, "save", "onSuccess"),
    withHandlers<Props, Partial<HandlerProps>>({
        onSave: ({save, id, newPassword, oldPassword}) => () => save({id, profile: {password: newPassword, oldPassword}})
    })
)(PasswordChangeDialog)
