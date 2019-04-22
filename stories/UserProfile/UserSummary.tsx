import {Avatar, Card, IconButton, makeStyles, Theme, Typography} from "@material-ui/core"
import {Favorite, PersonAdd, ThumbUp} from "@material-ui/icons"
import * as React from "react"

const useStyles = makeStyles((theme: Theme) => ({
    avatar: {
        width: 160,
        height: 160,
        marginRight: theme.spacing(4),
        [theme.breakpoints.down("xs")]: {
            width: 100,
            height: 100
        }
    },
    card: {
        display: "flex",
        width: "100%",
        maxWidth: 600,
        alignItems: "center",
        justifyContent: "flex-start",
        borderRadius: 80,
        [theme.breakpoints.down("xs")]: {
            borderRadius: 50
        }
    },
    statCount: {
        display: "flex",
        alignItems: "center"
    },
    icon: {
        marginRight: theme.spacing(1)
    },
    stats: {
        display: "flex",
        marginTop: theme.spacing(1)
    },
    statSpacer: {
        width: theme.spacing(2)
    },
    iconButton: {
        padding: theme.spacing(0.625, 0.75, 0.625, 0.5),
        marginBottom: theme.spacing(-1.25)
    },
    followButton: {
        position: "absolute",
        right: 0
    },
    usernameContainer: {
        display: "flex",
        alignItems: "center",
        width: "100%",
        justifyContent: "space-between",
        paddingRight: theme.spacing(3)
    },
    container: {
        width: "100%"
    },
}))

export const UserSummary = () => {
    const classes = useStyles()
    const t = val => val

    return (
        <Card className={classes.card}>
            <Avatar className={classes.avatar}/>
            <div className={classes.container}>
                <div className={classes.usernameContainer}>
                    <Typography variant="h4">This Is My Username</Typography>
                    <IconButton title={t("Follow")} about={t("Follow")}
                                className={classes.iconButton}><PersonAdd/></IconButton>
                </div>
                <div className={classes.stats}>
                    <div className={classes.statCount}><Favorite className={classes.icon}/>{2000}</div>
                    <div className={classes.statSpacer}/>
                    <div className={classes.statCount}><ThumbUp className={classes.icon}/>{4000}</div>
                </div>
            </div>
        </Card>
    )
}

export default UserSummary
