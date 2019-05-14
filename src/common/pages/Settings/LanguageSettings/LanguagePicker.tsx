import {Button, DialogActions, DialogContent, DialogTitle, Theme} from "@material-ui/core"
import {createStyles, makeStyles} from "@material-ui/styles"
import {useState} from "react"
import * as React from "react"
import {useTranslation} from "react-i18next"
import {Language} from "../../../../generated/graphql"
import LargeLanguageDisplay from "../../Intro/LargeLanguageDisplay"
import LargeLanguagePicker from "../../Intro/LargeLanguagePicker"

interface PropTypes {
    languages: Language[]
    closeDialog: () => void
    onSave: (language: Language) => void
    buttonText?: string
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    title: {
        marginLeft: theme.spacing(1)
    },
    spacer: {
        height: theme.spacing(1)
    }
}))

export const LanguagePicker = ({closeDialog, onSave, buttonText}: PropTypes) => {
    const classes = useStyles()
    const {t} = useTranslation()
    const [language, setLanguage] = useState<Language | undefined>(undefined)

    const save = () => {
        onSave(language!)
        closeDialog()
    }

    return (
        <>
            <DialogTitle className={classes.title}>
                {t("Pick a language")}
            </DialogTitle>
            <DialogContent>
                <LargeLanguageDisplay language={language}/>
                <div className={classes.spacer}/>
                <LargeLanguagePicker updateLanguage={setLanguage}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={closeDialog}>{t("Cancel")}</Button>
                <Button onClick={save}>{t(buttonText || "Add")}</Button>
            </DialogActions>
        </>
    )
}

export default LanguagePicker
