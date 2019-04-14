import {
    Avatar,
    Grid,
    IconButton,
    Theme,
    Tooltip
} from "@material-ui/core"
import {Close} from "@material-ui/icons"
import {createStyles, withStyles, WithStyles} from "@material-ui/styles"
import * as React from "react"
import {WithTranslation, withTranslation} from "react-i18next"
import {compose, pure} from "recompose"
import {WithUser} from "../../enhancers"

type Props = WithStyles<typeof styles> & WithUser & WithTranslation

const styles = (theme: Theme) => createStyles({
    avatar: {
        width: 160,
        height: 160
    },
    root: {
        display: "inline-flex",
        width: "inherit",
        flexWrap: "nowrap"
    },
    removeButton: {
        margin: theme.spacing(-2.5, 0.5, 0, 0)
    },
    iconButton: {
        padding: 1
    }
})

const ProfilePictureSelector = ({classes, user, t}: Props) => (
    <Grid container direction="column" justify="center" alignItems="center" className={classes.root}>
        <Grid item>
            <Grid container direction="row" justify="flex-start" alignItems="flex-start" className={classes.root}>
                <Grid item>
                    <Tooltip title={t("Change Profile Picture")} placement="right-end">
                        <IconButton className={classes.iconButton}>
                            <Avatar src={user.picture} className={classes.avatar} />
                        </IconButton>
                    </Tooltip>
                </Grid>
                <Grid item xs className={classes.removeButton}>
                    <Tooltip title={t("Remove Profile Picture")} placement="right-end">
                        <IconButton className={classes.iconButton}>
                            <Close />
                        </IconButton>
                    </Tooltip>
                </Grid>
            </Grid>
        </Grid>
    </Grid>
)

export default compose<Props, WithUser>(
    pure,
    withStyles(styles),
    withTranslation()
)(ProfilePictureSelector)
