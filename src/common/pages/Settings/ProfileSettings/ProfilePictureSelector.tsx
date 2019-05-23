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

import {
    Avatar,
    Grid,
    IconButton,
    Theme,
    Tooltip
} from "@material-ui/core"
import {createStyles, makeStyles} from "@material-ui/styles"
import * as React from "react"
import {useTranslation} from "react-i18next"
import {useDialog, useUser} from "../../../hooks"
import ProfilePictureUploadDialog from "./ProfilePictureUploadDialog"

const useStyles = makeStyles((theme: Theme) => createStyles({
    avatar: {
        width: 160,
        height: 160,
        [theme.breakpoints.down("xs")]: {
            width: 100,
            height: 100
        }
    },
    root: {
        display: "inline-flex",
        flexWrap: "nowrap",
        width: "fit-content"
    },
    removeButton: {
        margin: theme.spacing(0.5, 0, 0, -2.5),
        [theme.breakpoints.down("xs")]: {
            margin: theme.spacing(-1, 0, 0, -2)
        }
    },
    iconButton: {
        padding: 1
    }
}))

export const ProfilePictureSelector = () => {
    const classes = useStyles()
    const {t} = useTranslation()
    const user = useUser()
    const {Dialog, openDialog} = useDialog(ProfilePictureUploadDialog)

    return (
        <>
            <Dialog />
            <Grid container direction="column" justify="center" alignItems="center" className={classes.root}>
                <Grid item>
                    <Grid container direction="row" justify="flex-start" alignItems="flex-start" className={classes.root}>
                        <Grid item>
                            <Tooltip title={t("Change Profile Picture")} placement="right-end">
                                <IconButton className={classes.iconButton} onClick={() => openDialog()}>
                                    <Avatar src={user.picture} className={classes.avatar}/>
                                </IconButton>
                            </Tooltip>
                        </Grid>
{/*                        <Grid item xs className={classes.removeButton}>
                            <Tooltip title={t("Remove Profile Picture")} placement="right-end">
                                <IconButton className={classes.iconButton}>
                                    <Close/>
                                </IconButton>
                            </Tooltip>
                        </Grid>*/}
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default ProfilePictureSelector
