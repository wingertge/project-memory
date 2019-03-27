import {
    Avatar,
    createStyles,
    Grid,
    IconButton,
    PropTypes,
    Theme,
    Tooltip,
    withStyles,
    WithStyles
} from "@material-ui/core"
import {Close} from "@material-ui/icons"
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
        marginLeft: theme.spacing.unit * -2.5,
        marginTop: theme.spacing.unit * 0.5
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
