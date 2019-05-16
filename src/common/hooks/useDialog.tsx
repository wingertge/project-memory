import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core"
import * as React from "react"
import {ComponentType, useState} from "react"
import {useTranslation} from "react-i18next"

export function useDialog<TModalProps = {}>(ModalComponent: ComponentType<TModalProps>) {
    const [dialogOpen, setDialogOpen] = useState<boolean>(false)
    const [dialogProps, setDialogProps] = useState<any>(undefined)
    const openDialog = (extraProps?: Partial<TModalProps>) => {
        setDialogProps(extraProps)
        setDialogOpen(true)
    }
    const closeDialog = () => setDialogOpen(false)
    const dialog = () => (
        <Dialog open={dialogOpen} onClose={closeDialog} aria-labelledby="form-dialog-title">
            <ModalComponent closeDialog={closeDialog} {...dialogProps}/>
        </Dialog>
    )

    return {
        Dialog: dialog,
        openDialog,
        closeDialog
    }
}

export function useConfirmDialog(confirmAction: (...params: any) => void, title: string, text?: string): [(...params: any) => void, () => JSX.Element] {
    const {t} = useTranslation()
    const [dialogOpen, setDialogOpen] = useState<boolean>(false)
    const [params, setParams] = useState<any>(undefined)
    const openDialog = (...extraParams: any) => {
        setParams(extraParams)
        setDialogOpen(true)
    }
    const closeDialog = () => setDialogOpen(false)
    const onConfirm = () => {
        confirmAction(...params)
        closeDialog()
    }

    const dialog = () => (
        <Dialog open={dialogOpen} onClose={closeDialog}>
            <DialogTitle>{t(title)}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {t(text!)}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button color="primary" variant="contained" onClick={onConfirm}>{t("Confirm")}</Button>
                <Button variant="contained" onClick={closeDialog}>{t("Cancel")}</Button>
            </DialogActions>
        </Dialog>
    )

    return [openDialog, dialog]
}
