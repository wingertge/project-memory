import {
    Avatar,
    Card,
    CardContent,
    IconButton,
    makeStyles,
    Theme,
    Typography
} from "@material-ui/core"
import {Repeat, ReportProblem, ThumbUp, ThumbUpOutlined} from "@material-ui/icons"
import * as React from "react"

export interface Post {
    id: string
    createdAt: Date
    type: "post" | "repost"
    by: {
        id: string
        username: string
        avatar?: string
    }
    content?: string
    originalPost?: Post
}

interface PropTypes {
    post: Post
    isOwn?: boolean
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
        display: "flex"
    },
    actionIcon: {
        width: 24,
        height: 24
    },
    actionButton: {
        padding: theme.spacing(0.5),
        margin: theme.spacing(1, 0, -1, 0)
    }
}))

export const PostDisplay = ({post, isOwn}: PropTypes) => {
    const classes = useStyles()
    const isLiked = false
    const t = val => val

    return (
        <div className={classes.post}>
            <div className={classes.header}>
                <Avatar src={post.by.avatar} className={classes.avatar} />
                <Typography style={{fontWeight: "bold"}}>{post.by.username}</Typography>
                {post.type === "repost" && <Repeat className={classes.repostIcon} />}
            </div>
            <div>
                <Typography gutterBottom={post.type === "repost"}>{post.content}</Typography>
                {post.type === "repost" && (
                    <Card>
                        <CardContent>
                            <div className={classes.header}>
                                <Avatar src={post.originalPost!.by.avatar} className={classes.avatar} />
                                <Typography style={{fontWeight: "bold"}}>{post.originalPost!.by.username}</Typography>
                            </div>
                            {post.originalPost!.content}
                        </CardContent>
                    </Card>
                )}
                {!isOwn && (
                    <div className={classes.actions}>
                        {post.type !== "repost" && (
                            <IconButton title={t("Repost")} className={classes.actionButton}>
                                <Repeat className={classes.actionIcon} />
                            </IconButton>
                        )}
                        <IconButton title={isLiked ? t("Unlike") : t("Like")} className={classes.actionButton}>
                            {isLiked ? <ThumbUp className={classes.actionIcon} /> : <ThumbUpOutlined className={classes.actionIcon} />}
                        </IconButton>
                        <div style={{flex: "1 1 100%"}} />
                        <IconButton title={t("Report")} className={classes.actionButton}>
                            <ReportProblem className={classes.actionIcon} />
                        </IconButton>
                    </div>
                )}
            </div>
        </div>
    )
}

export default PostDisplay
