/*
The following is the license for the Project Memory Frontend, a frontend for the Project Memory web app.
Copyright (C) 2019  Genna Wingert

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

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
