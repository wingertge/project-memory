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

import {Button, Grid, TextField, Typography} from "@material-ui/core"
import {createStyles, makeStyles} from "@material-ui/styles"
import {useState} from "react"
import * as React from "react"
import Helmet from "react-helmet"
import {useTranslation} from "react-i18next"
import {oc} from "ts-optchain"
import {
    Deck,
    Language,
    useAddDeckMutation,
    useGlobalDecksQuery,
    useUpdateProfileMutation,
    useUserLanguagesQuery
} from "../../../generated/graphql"
import ApolloErrorBox from "../../components/apollo/ApolloErrorBox"
import {useDialog, useID, useValidatedFormState, ValidatorMap} from "../../hooks"
import {Theme} from "../../theme"
import {longerThan, notEmpty, shorterThan} from "../../util/validationUtils"
import LanguageDisplay from "../Settings/LanguageSettings/LanguageDisplay"
import LanguagePicker from "../Settings/LanguageSettings/LanguagePicker"
import PopularDecks from "./PopularDecks"

interface Form {
    name: string,
    language: string
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    form: {
        maxWidth: 500,
        width: "100%"
    },
    textField: {
        margin: theme.spacing(0.5, 0.5, 2, 0)
    },
    select: {
        margin: theme.spacing(0.5, 1.5, 0.5, 0),
    },
    button: {
        margin: theme.spacing(2)
    },
    nativeLanguage: {
        margin: theme.spacing(0, -1, 1, 0)
    }
}))

const validators: ValidatorMap<Form> = {
    name: [
        {fun: notEmpty, message: "Name cannot be empty"},
        {fun: longerThan(2), message: "Name has to be 3 characters or more"},
        {fun: shorterThan(65), message: "Name has to be 64 characters or less"}
    ]
}

export const FirstDeckStep = () => {
    const classes = useStyles()
    const {t} = useTranslation()
    const id = useID()
    const {data, loading, error} = useUserLanguagesQuery({
        variables: {
            userId: id
        }
    })
    const languages = oc(data).user.languages([]) as Language[]
    const nativeLanguage = oc(data).user.nativeLanguage() as Language
    const {name, language, valid} = useValidatedFormState<Form>({name: "", language: oc(languages)[0].id("")}, validators, {enableInitialValidation: false})
    const [selectedNativeLanguage, setNativeLanguage] = useState(nativeLanguage)

    const [updateProfile, {loading: updateProfileSaving}] = useUpdateProfileMutation({variables: {id, profile: {introStep: 3}}})
    const [addDeckMutation, {loading: addDeckSaving}] = useAddDeckMutation({
        variables: {
            input: {
                name: name.value,
                language: language.value,
                nativeLanguage: nativeLanguage && nativeLanguage.id,
                owner: id,
                cards: []
            },
            userId: id
        }
    })
    const addDeck = () => {
        addDeckMutation().then(() => updateProfile())
    }

    const globalDecks = useGlobalDecksQuery({
        variables: {
            limit: 20,
            filter: {
                language: {in: languages.map(lang => lang.id)},
                nativeLanguage: {eq: oc(nativeLanguage).id()}
            },
            sort: {
                sortBy: "rating",
                sortDirection: "desc"
            },
            userId: id
        }
    })
    const decks = oc(globalDecks.data).decks([]) as Deck[]
    const {Dialog, openDialog} = useDialog(LanguagePicker)

    const saving = updateProfileSaving || addDeckSaving

    if(error || globalDecks.error) return <ApolloErrorBox error={error || globalDecks.error} />
    if(loading || globalDecks.loading) return null

    return (
        <Grid container direction="column">
            <Dialog />
            <Helmet>
                <title>{t("First Deck - Project Memory")}</title>
            </Helmet>
            <Grid item xs>
                <Typography variant="h6">
                    {t("Alright, done. Let's create our first deck!")}
                </Typography>
            </Grid>
            <Grid item xs container alignItems="center" direction="column">
                <Grid item className={classes.form}>
                    <TextField label={t("Deck Name")} value={name.value} onChange={name.onChange} fullWidth className={classes.textField} error={!!name.error} helperText={name.error} />
                </Grid>
                <Grid item container alignItems="flex-end" className={classes.form}>
                    <Grid item xs>
                        <TextField label={t("Language")} value={language.value} onChange={language.onChange} select SelectProps={{style: {height: 32}}} fullWidth className={classes.textField}>
                            {languages.map(lang => (
                                <option key={lang.id} value={lang.id}>
                                    {`${t(lang.name)} (${lang.nativeName})`}
                                </option>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item className={classes.nativeLanguage}>
                        <LanguageDisplay language={selectedNativeLanguage} title={t("Native Language")} onClick={() => openDialog({buttonText: "Set", onSave: lang => setNativeLanguage(lang)})} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs>
                <Button className={classes.button} onClick={addDeck} disabled={saving || !valid || name.value === ""} variant="contained" color="primary">{t("Create")}</Button>
            </Grid>
            <Grid item xs>
                <Typography variant="h6">
                    {t("Or you can pick from one of these highly rated community ones.")}
                </Typography>
            </Grid>
            <PopularDecks decks={decks} onSave={updateProfile} />
        </Grid>
    )
}

export default FirstDeckStep
