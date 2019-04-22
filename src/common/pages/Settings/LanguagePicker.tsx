import {Button, DialogActions, DialogContent, DialogTitle, Theme} from "@material-ui/core"
import {createStyles, makeStyles} from "@material-ui/styles"
import {useState} from "react"
import * as React from "react"
import {useTranslation} from "react-i18next"
import {oc} from "ts-optchain"
import {Language, useAddLanguageToUserMutation} from "../../../generated/graphql"
import {useID} from "../../hooks"
import LargeLanguageDisplay from "../Intro/LargeLanguageDisplay"
import LargeLanguagePicker from "../Intro/LargeLanguagePicker"

interface PropTypes {
    languages: Language[]
    closeDialog: () => void
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    title: {
        marginLeft: theme.spacing(1)
    },
    spacer: {
        height: theme.spacing(1)
    }
}))

export const LanguagePicker = ({languages, closeDialog}: PropTypes) => {
    const classes = useStyles()
    const {t} = useTranslation()
    const id = useID()
    const [language, setLanguage] = useState<Language | undefined>(undefined)
    const addLanguageMutate = useAddLanguageToUserMutation({
        variables: {userId: id, languageId: oc(language).id("")},
        optimisticResponse: () => ({
            __typename: "Mutation",
            addLanguageToUser: {
                __typename: "User",
                id,
                languages: [...languages, language!].map(lang => ({
                    __typename: "Language",
                    id: lang.id,
                    name: lang.name,
                    nativeName: lang.nativeName,
                    languageCode: lang.languageCode
                })) as any
            }
        })
    })

    const addLanguage = () => {
        addLanguageMutate()
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
                <Button onClick={addLanguage}>{t("Add")}</Button>
            </DialogActions>
        </>
    )
}

export default LanguagePicker
