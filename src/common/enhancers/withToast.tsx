import * as React from "react"
import {compose, withHandlers} from "recompose"
import Toast from "../components/common/Toast"
import {withState} from "./index"
import {add} from "./wrap"

export interface WithToast {
    openToast: () => void
    closeToast: () => void
    toastOpen: boolean
    updateToastOpen: (state: boolean) => boolean
}

export function withToast<TProps extends WithToast = WithToast>(message: string, onUndo?: keyof TProps) {
    return compose(
        withState<{}, boolean>("toastOpen", "updateToastOpen", false),
        withHandlers<TProps, Partial<WithToast>>({
            openToast: ({updateToastOpen}) => () => updateToastOpen(true),
            closeToast: ({updateToastOpen}) => () => updateToastOpen(false)
        }),
        add((props: any) => <Toast message={props.t ? props.t(message) : message} open={props.toastOpen} onClose={props.closeToast} onUndo={props[onUndo]} />)
    )
}
