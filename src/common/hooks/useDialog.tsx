import {Dialog} from "@material-ui/core"
import * as React from "react"
import {ComponentType, useState} from "react"

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
