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
import {useDialog, useUser} from "../../hooks"
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
