import {
    Box,
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    TextField,
    Typography
} from "@material-ui/core"
import {createStyles, makeStyles} from "@material-ui/styles"
import React from "react"
import {useTranslation} from "react-i18next"
import ReactMarkdown from "react-markdown"
import {ReportReason} from "../../../generated/graphql"
import {useValidatedFormState} from "../../hooks"
import {Theme} from "../../theme"
import {shorterThan} from "../../util/validationUtils"

interface PropTypes {
    closeDialog: () => void
    submitReport: (reason: ReportReason, message: string) => Promise<any>
    saving?: boolean
}

interface Form {
    reason: ReportReason | "",
    message: string
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    content: {
        paddingBottom: theme.spacing(1)
    },
    actions: {
        paddingRight: theme.spacing(3)
    },
    message: {
        margin: theme.spacing(2, 0)
    }
}))

const messages = {
    copyright: `Are you sure you're the copyright owner? Only the owner of the content is allowed to file a copyright notice!
    **Warning:** If you submit this report, you do so under penalty of perjury.`,
    inappropriate: `Inappropriate content, for example, includes pornography and extreme violence. It does **not** include mild nudity in a non-sexual context, such as breast feeding.`,
    spam: "Spam includes advertising such as unsolicited links, nonsense/generated posts, or repeatedly posting the same thing.",
    hatespeech: "Hate Speech is difficult to define, so please use common sense here. Saying you don't like something isn't hatespeech, but calling for the death of all who support it is."
}

export const ReportDialog = ({closeDialog, submitReport, saving}: PropTypes) => {
    const classes = useStyles()
    const {t} = useTranslation()
    const {reason, message, valid} = useValidatedFormState<Form>({reason: "", message: ""}, {message: [{fun: shorterThan(5001), message: "Message can't be longer than 5000 characters"}]})

    const save = () => submitReport(reason.value as any, message.value).then(closeDialog)

    return (
        <>
            <DialogTitle>{t("Report this post")}</DialogTitle>
            <DialogContent className={classes.content}>
                <Typography color="textSecondary">{t("Select a reason why you want to report this post")}</Typography>
                <TextField label={t("Reason")} select value={reason.value} onChange={reason.onChange} fullWidth>
                    {["inappropriate", "copyright", "spam", "hatespeech"].map(reason => (
                        <MenuItem key={reason} value={reason}>
                            {t(reason)}
                        </MenuItem>
                    ))}
                </TextField>
                {reason.value !== "" && (
                    <div>
                        <Box className={classes.message}>
                            <ReactMarkdown>{t(messages[reason.value])}</ReactMarkdown>
                        </Box>
                        <TextField
                            label={t("Additional Message")}
                            value={message.value}
                            onChange={message.onChange}
                            multiline
                            variant="outlined"
                            rows={10} rowsMax={10}
                            fullWidth
                        />
                    </div>
                )}
            </DialogContent>
            <DialogActions className={classes.actions}>
                <Button variant="outlined" onClick={closeDialog}>{t("Cancel")}</Button>
                <Button variant="contained" color="primary" disabled={reason.value === "" || saving || !valid} onClick={save}>
                    {t("Submit")}
                </Button>
            </DialogActions>
        </>
    )
}

export default ReportDialog
