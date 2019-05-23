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

import {
    CircularProgress,
    IconButton, TextField,
    Theme,
    Tooltip
} from "@material-ui/core"
import {createStyles, makeStyles} from "@material-ui/styles"
import * as React from "react"
import {useTranslation} from "react-i18next"
import {oc} from "ts-optchain"
import {Language, useLanguagesQuery, useUserLanguagesQuery} from "../../../generated/graphql"
import ApolloErrorBox from "../../components/apollo/ApolloErrorBox"
import LanguageIcon from "../../components/common/LanguageIcon"
import {useFormState, useID} from "../../hooks"

interface PropTypes {
    updateLanguage: (state: Language) => void
    exclusive?: boolean
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    languageButtons: {
        display: "flex",
        flexWrap: "wrap"
    },
    languageButton: {
        padding: 0,
        margin: theme.spacing(1)
    },
    languageIcon: {
        width: 60,
        height: 60
    },
    searchField: {
        margin: theme.spacing(1),
        width: `calc(100% - ${theme.spacing(2)}px)`
    },
    root: {
        width: "100%"
    }
}))

export const LargeLanguagePicker = ({updateLanguage, exclusive}: PropTypes) => {
    const classes = useStyles()
    const {t} = useTranslation()
    const id = useID()
    const userLangs = useUserLanguagesQuery({
        variables: {
            userId: id
        }
    })
    const userLanguages = oc(userLangs.data).user.languages([]) as Language[]
    const langs = useLanguagesQuery()
    let languages = exclusive ?
        oc(langs.data).languages([]).filter(lang => !userLanguages.some(otherLang => otherLang.id === lang!.id)) as Language[] :
        oc(langs.data).languages([]) as Language[]
    const {search} = useFormState({search: ""})
    if(search.value !== "") {
        languages = languages.filter(({languageCode, name, nativeName}) =>
            languageCode.includes(search.value) ||
            name.includes(search.value) ||
            nativeName.includes(search.value)
        )
    }

    if(langs.error || userLangs.error) return <ApolloErrorBox error={langs.error || userLangs.error!} />
    if(langs.loading || userLangs.loading) return <CircularProgress />

    return (
        <div className={classes.root}>
            <TextField label={t("Search")} variant="outlined" margin="dense" value={search.value} onChange={search.onChange} className={classes.searchField} />
            <div className={classes.languageButtons}>
                {languages && languages.map(language => (
                    <Tooltip title={`${t(language.name)} (${language.nativeName})`} key={language.id}>
                        <IconButton className={classes.languageButton} onClick={() => updateLanguage(language)}>
                            <LanguageIcon language={language} className={classes.languageIcon}/>
                        </IconButton>
                    </Tooltip>
                ))}
            </div>
        </div>
    )
}

export default LargeLanguagePicker
