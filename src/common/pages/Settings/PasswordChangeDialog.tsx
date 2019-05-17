import React from "react"
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText, TextField, DialogActions, Button
} from "@material-ui/core"
import {useUpdateProfileMutation} from "../../../generated/graphql"
import {useValidatedFormState, useToast, ValidatorMap} from "../../hooks"
import {isEqualTo, passwordStrongEnough} from "../../util/validationUtils"
import {useTranslation} from "react-i18next"
import WithErrorBox from "../../components/apollo/WithErrorBox"

interface PropTypes {
    passwordExists: boolean
    open: boolean
    close: () => void
    id: string
}

interface Form {
    oldPassword: string
    newPassword: string
    newPasswordConfirm: string
}

const validators: ValidatorMap<Form> = {
    newPassword: [
        {fun: passwordStrongEnough(), message: "Password needs to be stronger"}
    ],
    newPasswordConfirm: [
        {fun: isEqualTo("newPassword"), message: "Passwords don't match"}
    ]
}

export const PasswordChangeDialog = (
    {id, open, passwordExists, close}: PropTypes
) => {
    const {t} = useTranslation()
    const {oldPassword, newPassword, newPasswordConfirm} = useValidatedFormState<Form>({
        oldPassword: "",
        newPassword: "",
        newPasswordConfirm: ""
    }, validators)

    const {Toast, openToast} = useToast(passwordExists ? "Successfully changed password" : "Successfully added a password")

    const [mutate, {loading: saving, error}] = useUpdateProfileMutation({
        variables: {
            id,
            profile: {
                password: newPassword.value,
                oldPassword: oldPassword.value
            }
        }
    })

    const save = () => {
        mutate().then(() => {
            openToast()
            close()
        })
    }

    const mutationData = {
        error
    }

    return (
        <>
            <Toast />
            <Dialog open={open} onClose={close} aria-labelledby="form-dialog-title">
                <DialogTitle>{passwordExists ? t("Change Password") : t("Create Password")}</DialogTitle>
                <DialogContent>
                    <WithErrorBox prop={mutationData} retry={save}>
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
                            onChange={oldPassword.onChange}
                            value={oldPassword.value}
                            error={!!oldPassword.error}
                            helperText={t(oldPassword.error!)}
                        />}
                        <TextField
                            autoFocus={!passwordExists}
                            margin="dense"
                            name="newPassword"
                            label={passwordExists ? t("New Password") : t("Password")}
                            type="password" fullWidth onChange={newPassword.onChange}
                            value={newPassword.value}
                            error={!!newPassword.error}
                            helperText={t(newPassword.error!)}
                        />
                        <TextField
                            margin="dense"
                            name="newPasswordConfirm"
                            label={passwordExists ? t("Confirm New Password") : t("Confirm Password")}
                            type="password"
                            fullWidth
                            value={newPasswordConfirm.value}
                            onChange={newPasswordConfirm.onChange}
                            error={!!newPasswordConfirm.error}
                            helperText={t(newPasswordConfirm.error!)}
                        />
                    </WithErrorBox>
                </DialogContent>
                <DialogActions>
                    <Button onClick={close} color="primary">
                        {t("Cancel")}
                    </Button>
                    <Button onClick={save} color="primary" disabled={saving}>
                        {t("Save")}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )

}

export default PasswordChangeDialog
