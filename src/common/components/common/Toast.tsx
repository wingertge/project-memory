import {createStyles, makeStyles} from "@material-ui/styles"
import React from "react"
import {Snackbar, Button, IconButton, Theme} from "@material-ui/core"
import {Close as CloseIcon} from "@material-ui/icons"
import * as PropTypes from "prop-types"
import {useTranslation} from "react-i18next"

const useStyles = makeStyles((theme: Theme) => createStyles({
    close: {
        padding: theme.spacing(0.5),
    }
}))

interface PropTypes {
    open: boolean,
    onClose: (event) => void,
    message?: string,
    onUndo?: (event) => void
}

export const Toast = ({open, onClose, message, onUndo}: PropTypes) => {
    const classes = useStyles()
    const {t} = useTranslation()
    return (
        <Snackbar
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "left"
            }}
            open={open}
            autoHideDuration={6000}
            onClose={onClose}
            ContentProps={{
                "aria-describedby": "message-id"
            }}
            message={<span id="message-id">{message}</span>}
            action={[
                onUndo && <Button key="undo" color="secondary" size="small" onClick={onUndo}>{t("UNDO")}</Button>,
                <IconButton key="close" aria-label="Close" color="inherit" className={classes.close} onClick={onClose}>
                    <CloseIcon/>
                </IconButton>
            ]}
        />
    )
}

export default Toast
