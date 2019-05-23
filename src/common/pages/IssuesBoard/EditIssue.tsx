import {Button, Card, TextField, Typography} from "@material-ui/core"
import {makeStyles} from "@material-ui/styles"
import {RouteComponentProps} from "@reach/router"
import {useEffect} from "react"
import * as React from "react"
import {useTranslation} from "react-i18next"
import {oc} from "ts-optchain"
import {useCreateIssueMutation, useEditIssueMutation, useIssueQuery} from "../../../generated/graphql"
import ApolloErrorBox from "../../components/apollo/ApolloErrorBox"
import {TimedCircularProgress} from "../../components/apollo/TimedCircularProgress"
import LinkButton from "../../components/common/LinkButton"
import RichTextEditor from "../../components/common/RichTextEditor"
import {useID, useToast, useValidatedFormState} from "../../hooks"
import {Theme} from "../../theme"
import {notEmpty, shorterThan} from "../../util/validationUtils"
import isEmpty from "validator/lib/isEmpty"

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(2),
        textAlign: "left",
        [theme.breakpoints.up("md")]: {
            padding: theme.spacing(2, 6)
        }
    },
    card: {
        padding: theme.spacing(0, 2, 2, 2)
    },
    textField: {
        marginTop: theme.spacing(2)
    },
    actions: {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        "& > *": {
            marginLeft: theme.spacing(1),
            marginTop: theme.spacing(1)
        }
    }
}))

interface Form {
    text: string
    title: string
}

const validators = {
    text: [
        {fun: notEmpty, message: "Question can't be empty"},
        {fun: shorterThan(5001), message: "Question must be 5000 characters or less"}
    ],
    title: [
        {fun: notEmpty, message: "Title can't be empty"},
        {fun: shorterThan(301), message: "Title can't be more than 300 characters long"}
    ]
}

interface RouteTypes {
    issueId: string
}

export const EditIssue = ({issueId, navigate}: RouteComponentProps<RouteTypes>) => {
    const classes = useStyles()
    const {t} = useTranslation()
    const userId = useID()
    const {data, loading, error} = useIssueQuery({skip: !issueId, variables: {id: issueId!, userId}})
    const issue = oc(data).issue()
    const issueTitle = oc(issue).title("")
    const issueContent = oc(issue).content("")

    const {text, title, valid} = useValidatedFormState<Form>({text: issueContent, title: issueTitle}, validators, {enableInitialValidation: false})

    const [createIssueMutate, {loading: savingCreate}] = useCreateIssueMutation({variables: {input: {title: title.value, content: text.value}}, refetchQueries: ["Issues"]})
    const [updateIssueMutate, {loading: savingEdit}] = useEditIssueMutation({variables: {id: issueId!, input: {title: title.value, content: text.value}}, refetchQueries: ["Issues"]})
    const createIssue = () => {
        createIssueMutate().then(() => {
            openToast()
            navigate!("/help/board")
        })
    }
    const updateIssue = () => {
        updateIssueMutate().then(() => {
            openToast()
            navigate!(`/help/board/${issueId}`)
        })
    }
    const save = () => {
        if(issue) updateIssue()
        else createIssue()
    }

    useEffect(() => {
        if(issue) {
            title.set(issue.title)
            text.set(issue.content)
        }
    }, [issue])

    const {Toast, openToast} = useToast("Issue created successfully")
    const saving = savingCreate || savingEdit

    if(loading) return <TimedCircularProgress />
    if(error) return <ApolloErrorBox error={error} />

    return (
        <div className={classes.root}>
            <Toast />
            <Card className={classes.card}>
                <Typography variant="h5" className={classes.textField}>{t("New Question")}</Typography>
                <TextField
                    label={t("Title")}
                    value={title.value}
                    onChange={title.onChange}
                    error={!!title.error}
                    helperText={title.error}
                    variant="outlined"
                    fullWidth autoFocus
                    className={classes.textField}
                />
                <RichTextEditor
                    value={text.value}
                    onChange={text.set}
                    label={t("Leave your question")}
                    variant="outlined"
                    rows={10} rowsMax={20}
                    error={!!text.error}
                    helperText={text.error}
                    className={classes.textField}
                />
                <div className={classes.actions}>
                    <Typography>{`${text.value.length}/5000`}</Typography>
                    <LinkButton to="/help/board" variant="outlined">{t("Cancel")}</LinkButton>
                    <Button variant="contained" color="primary" disabled={saving || !valid || isEmpty(text.value) || isEmpty(title.value)} onClick={save}>
                        {issue ? t("Save") : t("Post")}
                    </Button>
                </div>
            </Card>
        </div>
    )
}

export default EditIssue
