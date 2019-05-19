import {
    Avatar, Button,
    Card,
    CardContent,
    IconButton,
    makeStyles, TextField,
    Theme,
    Typography
} from "@material-ui/core"
import {Delete, Edit, Repeat, ReportProblem, ThumbUp, ThumbUpOutlined} from "@material-ui/icons"
import clsx from "clsx"
import {useState} from "react"
import * as React from "react"
import {useTranslation} from "react-i18next"
import useRouter from "use-react-router/use-react-router"
import {Post, useChangePostLikeMutation, useDeletePostMutation, useUpdatePostMutation} from "../../../generated/graphql"
import ReactMarkdown from "react-markdown"
import breaks from "remark-breaks"
import {useDialog, useID, useValidatedFormState} from "../../hooks"
import {shorterThan} from "../../util/validationUtils"
import ReportDialog from "./ReportDialog"
import moment from "moment"

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
    },
    editActions: {
        display: "flex",
        justifyContent: "flex-end"
    },
    button: {
        margin: theme.spacing(1, 0, 0, 1)
    }
}))

export const PostDisplay = ({post, isOwn, onRepostClick}: PropTypes) => {
    const classes = useStyles()
    const {t} = useTranslation()
    const {history} = useRouter()
    const userId = useID()
    const isLiked = post.isLikedBy
    const [deletePost] = useDeletePostMutation({
        variables: {id: post.id},
        refetchQueries: ["Feed"]
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
    const {Dialog, openDialog} = useDialog(ReportDialog)
    const [editing, setEditing] = useState(false)
    const {content, valid} = useValidatedFormState({content: post.content || ""}, {content: [{fun: shorterThan(4001), message: "Posts can't be longer than 4000 characters"}]})
    const [updatePostMutate] = useUpdatePostMutation({
        variables: {id: post.id, content: content.value},
        optimisticResponse: {
            __typename: "Mutation",
            editPost: {
                __typename: "Post",
                id: post.id,
                content: content.value
            }
        }
    })
    const updatePost = () => {
        updatePostMutate()
        setEditing(false)
    }
    const keyHandler = event => {
        if(event.key === "Enter" && event.shiftKey) {
            event.preventDefault()
            if(valid) updatePost()
        }
    }

    return (
        <div className={classes.post}>
            <Dialog />
            <div className={classes.header} onClick={() => {if(!isOwn) history.push(`/profile/${post.by.id}`)}} style={{cursor: isOwn ? "default" : "pointer"}}>
                <Avatar src={post.by.picture} className={classes.avatar} />
                <Typography style={{fontWeight: "bold"}}>{post.by.username}</Typography>
                {post.type === "repost" && <Repeat className={classes.repostIcon} />}
                <div style={{flex: "1 1 100%"}} />
                <Typography variant="body2" color="textSecondary" style={{whiteSpace: "nowrap"}}>
                    {t("posted {{time}}", {time: moment(post.createdAt).fromNow()})}
                </Typography>
            </div>
            <div>
                {post.content && (
                    <>
                        {!editing && <ReactMarkdown plugins={[breaks]} className={clsx(classes.content, {[classes.gutterBottom]: post.type === "repost"})}>{post.content}</ReactMarkdown>}
                        {editing && (
                            <div>
                                <TextField
                                    label={t("Edit Post")}
                                    value={content.value}
                                    onChange={content.onChange}
                                    multiline
                                    variant="outlined"
                                    fullWidth
                                    rowsMax={12}
                                    error={!!content.error}
                                    helperText={content.error}
                                    autoFocus
                                    onKeyPress={keyHandler}
                                />
                                <div className={classes.editActions}>
                                    <Button variant="outlined" onClick={() => setEditing(false)} className={classes.button}>{t("Cancel")}</Button>
                                    <Button variant="contained" color="primary" disabled={!valid || content.value === post.content} onClick={updatePost} className={classes.button}>
                                        {t("Save")}
                                    </Button>
                                </div>
                            </div>
                        )}
                    </>
                )}
                {post.type === "repost" && (
                    <Card>
                        <CardContent>
                            <div className={classes.header} onClick={() => history.push(`/profile/${post.originalPost!.by.id}`)} style={{cursor: "pointer"}}>
                                <Avatar src={post.originalPost!.by.picture} className={classes.avatar} />
                                <Typography style={{fontWeight: "bold"}}>{post.originalPost!.by.username}</Typography>
                            </div>
                            {post.originalPost!.content && <ReactMarkdown className={classes.content} plugins={[breaks]}>{post.originalPost!.content}</ReactMarkdown>}
                        </CardContent>
                    </Card>
                )}
                {!isOwn && (
                    <div className={classes.actions}>
                        {post.editedOn && <Typography variant="body2" color="textSecondary" style={{whiteSpace: "nowrap"}}>{t("edited {{date}}", {date: moment(post.editedOn).fromNow()})}</Typography>}
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
                        <IconButton title={t("Report")} onClick={() => openDialog({postId: post.id})} className={classes.actionButton}>
                            <ReportProblem className={classes.actionIcon} />
                        </IconButton>
                    </div>
                )}
                {isOwn && !editing && (
                    <div className={classes.actions}>
                        {post.editedOn && <Typography variant="body2" color="textSecondary" style={{whiteSpace: "nowrap"}}>{t("edited {{date}}", {date: moment(post.editedOn).fromNow()})}</Typography>}
                        <div style={{flex: "1 1 100%"}} />
                        {post.type === "post" && (
                            <IconButton title={t("Edit")} onClick={() => setEditing(true)} className={classes.actionButton}>
                                <Edit className={classes.actionIcon} />
                            </IconButton>
                        )}
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
