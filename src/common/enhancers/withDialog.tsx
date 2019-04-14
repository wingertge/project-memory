import {Dialog} from "@material-ui/core"
import * as React from "react"
import {ComponentType} from "react"
import {compose, withHandlers} from "recompose"
import {add, withState} from "./index"

export interface WithDialog<TModalProps> {
    openDialog: (extraProps?: Partial<TModalProps>) => void
    closeDialog: () => void
}

export interface DialogProps {
    closeDialog: () => void
}

interface ModalUpdaters<TModalProps> {
    dialogOpen: boolean
    dialogProps?: Partial<TModalProps>
    updateDialogOpen: (state: boolean) => boolean
    updateDialogProps: (state?: Partial<TModalProps>) => Partial<TModalProps> | undefined
}

export function withDialog<TProps extends WithDialog<TModalProps>, TModalProps = {}>(ModalComponent: ComponentType<TModalProps>) {
    return compose(
        withState<TProps & ModalUpdaters<TModalProps>, boolean>("dialogOpen", "updateDialogOpen", false),
        withState<TProps & ModalUpdaters<TModalProps>, object | undefined>("dialogProps", "updateDialogProps", undefined),
        withHandlers<TProps & ModalUpdaters<TModalProps>, Partial<WithDialog<TModalProps>>>({
            openDialog: ({updateDialogOpen, updateDialogProps}) => (extraProps?: Partial<TModalProps>) => {
                updateDialogProps(extraProps)
                updateDialogOpen(true)
            },
            closeDialog: ({updateDialogOpen}) => () => updateDialogOpen(false)
        }),
        add(({dialogOpen, closeDialog, dialogProps, ...rest}: TProps & ModalUpdaters<TModalProps> & any) => (
            <Dialog open={dialogOpen} onClose={closeDialog} aria-labelledby="form-dialog-title">
                <ModalComponent closeDialog={closeDialog} {...dialogProps} {...rest} />
            </Dialog>
        ))
    )
}
