import * as React from "react"
import {compose, mapper, withHandlers} from "recompose"
import Toast from "../components/common/Toast"
import {withState} from "./index"
import {add} from "./wrap"

export interface WithToast {
    openToast: () => void
    closeToast: () => void
    toastOpen: boolean
    updateToastOpen: (state: boolean) => boolean
}

export function withToast<TProps extends WithToast = WithToast>(message: string | mapper<TProps, string>, onUndo?: keyof TProps) {
    return compose(
        withState<TProps, boolean>("toastOpen", "updateToastOpen", false),
        withHandlers<TProps, Partial<WithToast>>({
            openToast: ({updateToastOpen}) => () => updateToastOpen(true),
            closeToast: ({updateToastOpen}) => () => updateToastOpen(false)
        }),
        add((props: any) => {
            const t = props.t
            let msg = typeof message === "function" ? message(props) : message
            if(t) msg = t(msg)
            return <Toast
                message={msg}
                open={props.toastOpen}
                onClose={props.closeToast}
                onUndo={props[onUndo]}
            />
        })
    )
}
