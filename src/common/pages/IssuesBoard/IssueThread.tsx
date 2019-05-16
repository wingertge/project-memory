import {Avatar, Breadcrumbs, Button, Card, IconButton, TablePagination, Typography} from "@material-ui/core"
import {fade} from "@material-ui/core/styles"
import {DeleteOutlined} from "@material-ui/icons"
import {createStyles, makeStyles} from "@material-ui/styles"
import {useRef, useState} from "react"
import * as React from "react"
import {useTranslation} from "react-i18next"
import ReactMarkdown from "react-markdown"
import {Link} from "react-router-dom"
import breaks from "remark-breaks"
import moment from "moment"
import {oc} from "ts-optchain"
import useRouter from "use-react-router"
import {
    Issue,
    useDeleteIssueMutation,
    useDeleteIssueReplyMutation,
    useIssueQuery,
    useReplyToIssueMutation
} from "../../../generated/graphql"
import ApolloErrorBox from "../../components/apollo/ApolloErrorBox"
import {TimedCircularProgress} from "../../components/apollo/TimedCircularProgress"
import RichTextEditor from "../../components/common/RichTextEditor"
import {useConfirmDialog, useID, useToast, useUser, useValidatedFormState} from "../../hooks"
import {Theme} from "../../theme"
import {notEmpty, shorterThan} from "../../util/validationUtils"

const useStyles = makeStyles((theme: Theme) => createStyles({
    sideBar: {
        width: 150,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingRight: theme.spacing(2)
    },
    content: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        flex: "1 1 100%",
        borderLeftWidth: 1,
        borderLeftStyle: "solid",
        borderLeftColor: fade(theme.palette.text.primary, 0.12)
    },
    contentText: {
        padding: theme.spacing(0, 2),
        textAlign: "left"
    },
    cardContent: {
        display: "flex",
        padding: theme.spacing(1, 1, 1, 2)
    },
    card: {
        marginTop: theme.spacing(1)
    },
    root: {
        padding: theme.spacing(1, 2, 0, 2),
        [theme.breakpoints.up("md")]: {
            padding: theme.spacing(1, 6, 0, 6)
        }
    },
    iconButton: {
        padding: theme.spacing(0.5)
    },
    actions: {
        display: "flex",
        justifyContent: "flex-end",
        width: "100%",
        position: "absolute",
        bottom: theme.spacing(1),
        right: theme.spacing(1)
    },
    avatar: {
        width: 50,
        height: 50
    },
    button: {
        marginLeft: theme.spacing(1)
    },
    replyActions: {
        display: "flex",
        justifyContent: "flex-end"
    }
}))

interface RouteProps {
    threadId: string
}

interface Form {
    content: string
}

const validators = {
    content: [
        {fun: notEmpty, message: "Question can't be empty"},
        {fun: shorterThan(5001), message: "Question must be 5000 characters or less"}
    ]
}

export const IssueThread = () => {
    const classes = useStyles()
    const {t} = useTranslation()
    const {match: {params: {threadId}}, history} = useRouter<RouteProps>()
    const {content, valid} = useValidatedFormState<Form>({content: ""}, validators, {enableInitialValidation: false})
    const inputRef = useRef<() => void>()

    const id = useID()
    const user = useUser()

    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [page, setPage] = useState(0)

    const repliesSelect = {
        limit: rowsPerPage,
        offset: page * rowsPerPage,
        sort: {sortBy: "postedAt" as "postedAt", sortDirection: "asc" as "asc"}
    }

    const {data, loading, error} = useIssueQuery({
        variables: {
            id: threadId,
            repliesSelect
        }
    })

    const deleteIssueMutate = useDeleteIssueMutation({
        variables: {id: threadId},
        refetchQueries: ["Issues"]
    })
    const deleteIssue = () => {
        deleteIssueMutate().then(() => {
            openDeleteIssueToast()
            history.push("/help/board")
        })
    }

    const issue = oc(data).issue() as Issue

    const deleteReplyMutate = useDeleteIssueReplyMutation()
    const deleteReply = (replyId: string) => {
        deleteReplyMutate({
            variables: {id: replyId, repliesSelect},
            optimisticResponse: {
                __typename: "Mutation",
                deleteIssueReply: {
                    __typename: "Issue",
                    id: threadId,
                    replies: issue.replies.filter(reply => reply.id !== replyId),
                    replyCount: issue.replyCount - 1
                }
            }
        })
    }
    const requestReplyDelete = (replyId: string) => openDeleteReplyConfirm(replyId)

    const replyToIssueMutate = useReplyToIssueMutation()
    const replyToIssue = () => {
        replyToIssueMutate({
            variables: {id: threadId, content: content.value, repliesSelect},
            optimisticResponse: {
                __typename: "Mutation",
                replyToIssue: {
                    __typename: "Issue",
                    id: threadId,
                    replies: issue.replies.length > 10 ? issue.replies : [...issue.replies, {__typename: "IssueReply", id: "asd", content: content.value, by: {...user}, postedAt: new Date()}],
                    replyCount: issue.replyCount + 1
                }
            },
            refetchQueries: ["Issues"]
        })
        content.set("")
    }

    const {Toast: DeleteIssueToast, openToast: openDeleteIssueToast} = useToast("Successfully deleted the issue")
    const [openDeleteIssueConfirm, DeleteIssueConfirmDialog] = useConfirmDialog(deleteIssue, "Delete this issue?", "Are you sure you want to delete this issue? This action is irreversible and will delete all replies as well.")
    const [openDeleteReplyConfirm, DeleteReplyConfirmDialog] = useConfirmDialog(deleteReply, "Delete this reply?", "Are you sure you want to delete this reply?")

    if(loading || !user) return <TimedCircularProgress />
    if(error) return <ApolloErrorBox error={error} />

    const SideBar = () => (
        <div className={classes.sideBar}>
            <Avatar src={issue.by.picture} className={classes.avatar} />
            <Typography>{issue.by.username}</Typography>
            <Typography variant="body2" color="textSecondary">{moment(issue.postedAt).fromNow()}</Typography>
        </div>
    )

    return (
        <div className={classes.root}>
            <Breadcrumbs aria-label={t("Breadcrumb")}>
                <Link to="/help">
                    {t("Help")}
                </Link>
                <Link to="/help/board">
                    {t("Board")}
                </Link>
                <Typography color="textPrimary">
                    {issue.title.length > 40 ? issue.title.substring(0, 38) + "..." : issue.title}
                </Typography>
            </Breadcrumbs>
            <DeleteIssueToast />
            <DeleteIssueConfirmDialog />
            <DeleteReplyConfirmDialog />
            <Card className={classes.card}>
                <div className={classes.cardContent}>
                    <SideBar />
                    <div className={classes.content}>
                        <div className={classes.contentText}>
                            <Typography variant="h5">{issue.title}</Typography>
                            <ReactMarkdown plugins={[breaks]}>{issue.content}</ReactMarkdown>
                        </div>
                        <div className={classes.actions}>
                            {issue.by.id === id && (
                                <IconButton onClick={openDeleteIssueConfirm} className={classes.iconButton}>
                                    <DeleteOutlined color="error" />
                                </IconButton>
                            )}
                        </div>
                    </div>
                </div>
            </Card>
            {issue.replies.map(reply => (
                <Card key={reply.id} className={classes.card}>
                    <div className={classes.cardContent}>
                        <SideBar />
                        <div className={classes.content}>
                            <ReactMarkdown plugins={[breaks]} className={classes.contentText}>{reply.content}</ReactMarkdown>
                            <div className={classes.actions}>
                                {reply.by.id === id && (
                                    <IconButton onClick={() => requestReplyDelete(reply.id)} className={classes.iconButton}>
                                        <DeleteOutlined color="error" />
                                    </IconButton>
                                )}
                            </div>
                        </div>
                    </div>
                </Card>
            ))}
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={issue.replyCount}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                    native: true,
                }}
                onChangePage={(_, newPage) => setPage(newPage)}
                onChangeRowsPerPage={e => setRowsPerPage(parseInt(e.target.value, 10))}
            />
            <div>
                <RichTextEditor saveRef={inputRef} value={content.value} onChange={content.set} rows={5} rowsMax={10} />
                <div className={classes.replyActions}>
                    <Button variant="outlined" onClick={() => content.set("")} className={classes.button}>
                        {t("Clear")}
                    </Button>
                    <Button variant="contained" color="primary" disabled={!valid || content.value.length === 0} onClick={replyToIssue} className={classes.button}>
                        {t("Save")}
                    </Button>
                </div>
            </div>
        </div>
    )
}

// noinspection JSUnusedGlobalSymbols
export default IssueThread
