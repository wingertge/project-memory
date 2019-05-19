import {Avatar, Breadcrumbs, Button, Card, Collapse, IconButton, TablePagination, Typography} from "@material-ui/core"
import {fade} from "@material-ui/core/styles"
import {DeleteOutlined, Edit, ReportProblem} from "@material-ui/icons"
import {createStyles, makeStyles} from "@material-ui/styles"
import {useState} from "react"
import * as React from "react"
import {useTranslation} from "react-i18next"
import ReactMarkdown from "react-markdown"
import {Link} from "react-router-dom"
import breaks from "remark-breaks"
import moment from "moment"
import {oc} from "ts-optchain"
import useRouter from "use-react-router"
import {
    Issue, IssueReply, ReportReason,
    useDeleteIssueMutation,
    useDeleteIssueReplyMutation, useEditIssueReplyMutation,
    useIssueQuery,
    useReplyToIssueMutation, useReportIssueMutation, useReportIssueReplyMutation
} from "../../../generated/graphql"
import ApolloErrorBox from "../../components/apollo/ApolloErrorBox"
import {TimedCircularProgress} from "../../components/apollo/TimedCircularProgress"
import ReportDialog from "../../components/common/ReportDialog"
import RichTextEditor from "../../components/common/RichTextEditor"
import {useConfirmDialog, useDialog, useID, useToast, useUser, useValidatedFormState} from "../../hooks"
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
        borderLeftColor: fade(theme.palette.text.primary, 0.12),
        position: "relative"
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
        bottom: 0,
        right: 0,
        alignItems: "center",
        paddingLeft: theme.spacing(2)
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
    },
    editActions: {
        display: "flex",
        justifyContent: "flex-end",
        "& > *": {
            marginLeft: theme.spacing(1)
        }
    },
    replyEditor: {
        width: "100%",
        paddingLeft: theme.spacing(1)
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
            userId: id,
            ...repliesSelect
        }
    })

    const [deleteIssueMutate] = useDeleteIssueMutation({
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

    const [deleteReplyMutate] = useDeleteIssueReplyMutation()
    const deleteReply = (replyId: string) => {
        deleteReplyMutate({
            variables: {id: replyId, ...repliesSelect},
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

    const [replyToIssueMutate] = useReplyToIssueMutation()
    const replyToIssue = () => {
        replyToIssueMutate({
            variables: {id: threadId, content: content.value, ...repliesSelect},
            optimisticResponse: {
                __typename: "Mutation",
                replyToIssue: {
                    __typename: "Issue",
                    id: threadId,
                    replies: issue.replies.length > 10 ? issue.replies : [...issue.replies, {__typename: "IssueReply", id: "asd", content: content.value, by: {...user}, postedAt: new Date(), editedOn: null}],
                    replyCount: issue.replyCount + 1
                }
            },
            refetchQueries: ["Issues"]
        })
        content.set("")
    }

    const [reportIssueMutate, {loading: issueReportSaving}] = useReportIssueMutation()
    const reportIssue = (reason: ReportReason, message: string) => reportIssueMutate({
        variables: {
            id: issue.id,
            userId: id,
            reason,
            message
        },
        refetchQueries: ["Issues"]
    }).then(() => history.push("/help/board"))

    const {Toast: DeleteIssueToast, openToast: openDeleteIssueToast} = useToast("Successfully deleted the issue")
    const [openDeleteIssueConfirm, DeleteIssueConfirmDialog] = useConfirmDialog(deleteIssue, "Delete this issue?", "Are you sure you want to delete this issue? This action is irreversible and will delete all replies as well.")
    const [openDeleteReplyConfirm, DeleteReplyConfirmDialog] = useConfirmDialog(deleteReply, "Delete this reply?", "Are you sure you want to delete this reply?")
    const {Dialog, openDialog} = useDialog(ReportDialog)

    if(loading || !user) return <TimedCircularProgress />
    if(error) return <ApolloErrorBox error={error} />

    const SideBar = ({by, postedAt}) => (
        <div className={classes.sideBar}>
            <Avatar src={by.picture} className={classes.avatar} onClick={() => history.push(`/profile/${by.id}`)} style={{cursor: "pointer"}} />
            <Typography onClick={() => history.push(`/profile/${by.id}`)} style={{cursor: "pointer"}}>{by.username}</Typography>
            <Typography variant="body2" color="textSecondary">{moment(postedAt).fromNow()}</Typography>
        </div>
    )

    const ReplyDisplay = ({reply}: {reply: IssueReply}) => {
        const [editing, setEditing] = useState(false)
        const {content, valid} = useValidatedFormState({content: reply.content}, validators)
        const [editReplyMutate, {loading: saving}] = useEditIssueReplyMutation({variables: {id: reply.id, content: content.value}})

        const [reportIssueReplyMutate, {loading: issueReplyReportSaving}] = useReportIssueReplyMutation()
        const reportIssueReply = (reason: ReportReason, message: string) => reportIssueReplyMutate({
            variables: {
                id: issue.id,
                userId: id,
                reason,
                message
            },
            refetchQueries: ["Issues"]
        })

        return (
            <Card className={classes.card}>
                <div className={classes.cardContent}>
                    <SideBar by={reply.by} postedAt={reply.postedAt} />
                    <div className={classes.content}>
                        {!editing && <ReactMarkdown plugins={[breaks]} className={classes.contentText}>{reply.content}</ReactMarkdown>}
                        {editing && (
                            <div className={classes.replyEditor}>
                                <RichTextEditor
                                    label={t("Edit reply")}
                                    value={content.value}
                                    onChange={content.set}
                                    rowsMax={10}
                                    error={!!content.error}
                                    helperText={content.error}
                                    autoFocus
                                />
                                <div className={classes.editActions}>
                                    <Button variant="outlined" onClick={() => setEditing(false)}>{t("Cancel")}</Button>
                                    <Button variant="contained" color="primary" disabled={!valid || content.value === reply.content || saving} onClick={() => editReplyMutate()}>
                                        {t("Save")}
                                    </Button>
                                </div>
                            </div>
                        )}
                        <div style={{height: 32}} />
                        {!editing && (
                            <div className={classes.actions}>
                                {reply.editedOn && (
                                    <Typography variant="body2" color="textSecondary" style={{whiteSpace: "nowrap"}}>
                                        {t("edited {{time}}", {time: moment(reply.editedOn).fromNow()})}
                                    </Typography>
                                )}
                                <div style={{flex: "1 1 100%"}} />
                                {reply.by.id === id && (
                                    <>
                                        <IconButton onClick={() => setEditing(true)} className={classes.iconButton}>
                                            <Edit />
                                        </IconButton>
                                        <IconButton onClick={() => requestReplyDelete(reply.id)} className={classes.iconButton}>
                                            <DeleteOutlined color="error" />
                                        </IconButton>
                                    </>
                                )}
                                {reply.by.id !== id && (
                                    <IconButton onClick={() => openDialog({submitReport: reportIssueReply, saving: issueReplyReportSaving})} className={classes.iconButton}>
                                        <ReportProblem />
                                    </IconButton>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </Card>
        )
    }

    return (
        <div className={classes.root}>
            <Dialog />
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
                    <SideBar by={issue.by} postedAt={issue.postedAt} />
                    <div className={classes.content}>
                        <div className={classes.contentText}>
                            <Typography variant="h5">{issue.title}</Typography>
                            <ReactMarkdown plugins={[breaks]}>{issue.content}</ReactMarkdown>
                        </div>
                        <div style={{height: 32}} />
                        <div className={classes.actions}>
                            {issue.editedOn && (
                                <Typography variant="body2" color="textSecondary" style={{whiteSpace: "nowrap"}}>
                                    {t("edited {{time}}", {time: moment(issue.editedOn).fromNow()})}
                                </Typography>
                            )}
                            <div style={{flex: "1 1 100%"}} />
                            {issue.by.id === id && (
                                <>
                                    <IconButton onClick={() => history.push(`/help/board/edit/${issue.id}`)} className={classes.iconButton}>
                                        <Edit />
                                    </IconButton>
                                    <IconButton onClick={openDeleteIssueConfirm} className={classes.iconButton}>
                                        <DeleteOutlined color="error" />
                                    </IconButton>
                                </>
                            )}
                            {issue.by.id !== id && (
                                <IconButton onClick={() => openDialog({submitReport: reportIssue, saving: issueReportSaving})} className={classes.iconButton}>
                                    <ReportProblem />
                                </IconButton>
                            )}
                        </div>
                    </div>
                </div>
            </Card>
            {issue.replies.map(reply => (
                <Collapse key={reply.id} in={!reply.isReportedBy}>
                    <ReplyDisplay reply={reply} />
                </Collapse>
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
                <RichTextEditor value={content.value} onChange={content.set} rows={5} rowsMax={10} />
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
