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
