import React from "react"
import {withStyles, Snackbar, Button, IconButton, WithStyles, createStyles, Theme} from "@material-ui/core"
import {Close as CloseIcon} from "@material-ui/icons"
import * as PropTypes from "prop-types"
import {WithTranslation, withTranslation} from "react-i18next"
import {compose, pure} from "recompose"

const styles = (theme: Theme) => createStyles({
    close: {
        padding: theme.spacing.unit / 2,
    }
})

interface PropTypes {
    open: boolean,
    onClose: (event) => void,
    message?: string,
    onUndo?: (event) => void
}

type Props = WithStyles<typeof styles> & PropTypes & WithTranslation

const Toast = ({open, onClose, message, onUndo, classes, t}: Props) => (
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
                <CloseIcon />
            </IconButton>
        ]}
    />
)

export default compose<Props, PropTypes>(
    pure,
    withStyles(styles),
    withTranslation()
)(Toast)
