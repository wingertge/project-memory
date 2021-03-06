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

import {Avatar, Card, Hidden, IconButton, makeStyles, Theme, Tooltip, Typography} from "@material-ui/core"
import {Favorite, PersonAdd, ThumbUp, PersonAddOutlined} from "@material-ui/icons"
import * as React from "react"
import {useTranslation} from "react-i18next"
import {AggregatedFeedDocument, useChangeFollowingStatusMutation, User} from "../../../generated/graphql"
import {TimedCircularProgress} from "../../components/apollo/TimedCircularProgress"
import {useID} from "../../hooks"

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
    const currentUserId = useID()

    const [changeFollowingStatusMutate] = useChangeFollowingStatusMutation()

    if(!user) return <TimedCircularProgress />

    const toggleFollow = () => {
        changeFollowingStatusMutate({
            variables: {userId: user.id, currentUserId, value: !user.isFollowedBy},
            optimisticResponse: {
                __typename: "Mutation",
                changeFollowingStatus: {
                    __typename: "User",
                    id: user.id,
                    isFollowedBy: !user.isFollowedBy
                }
            },
            refetchQueries: [{query: AggregatedFeedDocument, variables: {userId: currentUserId, filter: {limit: 20, sortBy: "createdAt", sortDirection: "desc"}}}]
        })
    }

    return (
        <Card className={classes.card}>
            <Avatar className={classes.avatar} src={user.picture}/>
            <div className={classes.container}>
                <div className={classes.usernameContainer}>
                    <Hidden xsDown initialWidth="lg">
                        <Typography variant="h4">{user.username}</Typography>
                    </Hidden>
                    <Hidden smUp>
                        <Typography variant="h6">{user.username}</Typography>
                    </Hidden>
                    {!isOwn && (
                        <Tooltip title={user.isFollowedBy ? t("Unfollow") : t("Follow")} about={t("Follow")}>
                            <IconButton onClick={toggleFollow} className={classes.iconButton}>
                                {user.isFollowedBy ? <PersonAdd/> : <PersonAddOutlined/>}
                            </IconButton>
                        </Tooltip>
                    )}
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
