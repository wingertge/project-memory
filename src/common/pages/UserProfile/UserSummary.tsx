import {Avatar, Card, Hidden, IconButton, makeStyles, Theme, Typography} from "@material-ui/core"
import {Favorite, PersonAdd, ThumbUp} from "@material-ui/icons"
import * as React from "react"
import {useTranslation} from "react-i18next"
import {User} from "../../../generated/graphql"
import {TimedCircularProgress} from "../../components/common/TimedCircularProgress"

interface PropTypes {
    user: User
    isOwn?: boolean
}

const useStyles = makeStyles((theme: Theme) => ({
    avatar: {
        width: 160,
        height: 160,
        marginRight: theme.spacing(2),
        [theme.breakpoints.down("xs")]: {
            width: 120,
            height: 120,
            marginRight: theme.spacing(2)
        }
    },
    card: {
        display: "flex",
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-start",
        borderRadius: 80,
        [theme.breakpoints.down("xs")]: {
            borderRadius: 60
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
        position: "absolute" as "absolute",
        right: 0
    },
    usernameContainer: {
        display: "flex",
        alignItems: "center",
        width: "100%",
        justifyContent: "space-between",
        paddingRight: theme.spacing(3),
        textAlign: "left" as "left"
    },
    container: {
        width: "100%"
    }
}))

export const UserSummary = ({user, isOwn}: PropTypes) => {
    const classes = useStyles()
    const {t} = useTranslation()

    if(!user) return <TimedCircularProgress />

    return (
        <Card className={classes.card}>
            <Avatar className={classes.avatar} src={user.picture}/>
            <div className={classes.container}>
                <div className={classes.usernameContainer}>
                    <Hidden xsDown>
                        <Typography variant="h4">{user.username}</Typography>
                    </Hidden>
                    <Hidden smUp>
                        <Typography variant="h6">{user.username}</Typography>
                    </Hidden>
                    {!isOwn && <IconButton title={t("Follow")} about={t("Follow")} className={classes.iconButton}><PersonAdd/></IconButton>}
                </div>
                <div className={classes.stats}>
                    <div className={classes.statCount}><Favorite className={classes.icon}/>{user.totalSubscribers}</div>
                    <div className={classes.statSpacer}/>
                    <div className={classes.statCount}><ThumbUp className={classes.icon}/>{user.totalRating}</div>
                </div>
            </div>
        </Card>
    )
}

export default UserSummary
