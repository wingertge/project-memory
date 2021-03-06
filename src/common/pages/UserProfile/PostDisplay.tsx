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
    Card,
    CardContent,
    IconButton,
    makeStyles,
    Theme,
    Typography
} from "@material-ui/core"
import {Delete, Repeat, ReportProblem, ThumbUp, ThumbUpOutlined} from "@material-ui/icons"
import {navigate} from "@reach/router"
import clsx from "clsx"
import * as React from "react"
import {useTranslation} from "react-i18next"
import {Post, useChangePostLikeMutation, useDeletePostMutation} from "../../../generated/graphql"
import ReactMarkdown from "react-markdown"
import breaks from "remark-breaks"
import {useID} from "../../hooks"

interface PropTypes {
    post: Post
    isOwn?: boolean
    onRepostClick: (post: Post) => void
}

const useStyles = makeStyles((theme: Theme) => ({
    post: {
        width: "100%",
        paddingBottom: theme.spacing(2)
    },
    header: {
        display: "flex",
        alignItems: "center",
        marginBottom: theme.spacing(2)
    },
    avatar: {
        width: 40,
        height: 40,
        marginRight: theme.spacing(1.5)
    },
    repostIcon: {
        width: 16,
        height: 16,
        marginLeft: theme.spacing(0.5),
        marginBottom: theme.spacing(-0.5)
    },
    actions: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(1, 0, -1, 0)
    },
    actionIcon: {
        width: 24,
        height: 24
    },
    actionButton: {
        padding: theme.spacing(0.5)
    },
    content: {
        "& > p": {
            display: "block",
            width: "100%",
            wordWrap: "break-word" as any,
            maxHeight: 1.43 * 14 * 15,
            overflow: "auto"
        }
    },
    gutterBottom: {
        marginBottom: theme.spacing(1)
    },
    likeCount: {
        marginLeft: theme.spacing(0.5)
    }
}))

export const PostDisplay = ({post, isOwn, onRepostClick}: PropTypes) => {
    const classes = useStyles()
    const {t} = useTranslation()
    const userId = useID()
    const isLiked = post.isLikedBy
    const [deletePost] = useDeletePostMutation({
        variables: {id: post.id},
        refetchQueries: ["UserFeed"]
    })
    const [changeLikeStatus] = useChangePostLikeMutation()
    const toggleLike = () => {
        changeLikeStatus({
            variables: {id: post.id, userId, value: !isLiked},
            optimisticResponse: {
                __typename: "Mutation",
                changePostLikeStatus: {
                    __typename: "Post",
                    id: post.id,
                    isLikedBy: !isLiked,
                    likeCount: isLiked ? post.likeCount - 1 : post.likeCount + 1
                }
            }
        })
    }

    return (
        <div className={classes.post}>
            <div className={classes.header}>
                <Avatar src={post.by.picture} className={classes.avatar} />
                <Typography style={{fontWeight: "bold"}}>{post.by.username}</Typography>
                {post.type === "repost" && <Repeat className={classes.repostIcon} />}
            </div>
            <div>
                {post.content && <ReactMarkdown plugins={[breaks]} className={clsx(classes.content, {[classes.gutterBottom]: post.type === "repost"})}>{post.content}</ReactMarkdown>}
                {post.type === "repost" && (
                    <Card>
                        <CardContent>
                            <div className={classes.header} onClick={() => navigate(`/profile/${post.originalPost!.by.id}`)} style={{cursor: "pointer"}}>
                                <Avatar src={post.originalPost!.by.picture} className={classes.avatar} />
                                <Typography style={{fontWeight: "bold"}}>{post.originalPost!.by.username}</Typography>
                            </div>
                            {post.originalPost!.content && <ReactMarkdown className={classes.content} plugins={[breaks]}>{post.originalPost!.content}</ReactMarkdown>}
                        </CardContent>
                    </Card>
                )}
                {!isOwn && (
                    <div className={classes.actions}>
                        {post.type !== "repost" && (
                            <IconButton title={t("Repost")} className={classes.actionButton} onClick={() => onRepostClick(post)}>
                                <Repeat className={classes.actionIcon} />
                            </IconButton>
                        )}
                        <IconButton title={isLiked ? t("Unlike") : t("Like")} onClick={toggleLike} className={classes.actionButton}>
                            {isLiked ? <ThumbUp className={classes.actionIcon} /> : <ThumbUpOutlined className={classes.actionIcon} />}
                        </IconButton>
                        <Typography className={classes.likeCount}>{post.likeCount}</Typography>
                        <div style={{flex: "1 1 100%"}} />
                        <IconButton title={t("Report")} className={classes.actionButton}>
                            <ReportProblem className={classes.actionIcon} />
                        </IconButton>
                    </div>
                )}
                {isOwn && (
                    <div className={classes.actions}>
                        <div style={{flex: "1 1 100%"}} />
                        <IconButton title={t("Delete")} onClick={() => deletePost()} className={classes.actionButton}>
                            <Delete className={classes.actionIcon} />
                        </IconButton>
                    </div>
                )}
            </div>
        </div>
    )
}

export default PostDisplay
