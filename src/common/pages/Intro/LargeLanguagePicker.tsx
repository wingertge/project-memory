import {
    Avatar,
    CircularProgress,
    IconButton,
    Theme,
    Tooltip
} from "@material-ui/core"
import {createStyles, makeStyles} from "@material-ui/styles"
import * as React from "react"
import {useTranslation} from "react-i18next"
import {oc} from "ts-optchain"
import {Language, useLanguagesQuery, useUserLanguagesQuery} from "../../../generated/graphql"
import ApolloErrorBox from "../../components/common/ApolloErrorBox"
import {useID} from "../../hooks"

interface PropTypes {
    updateLanguage: (state: Language) => void
    exclusive?: boolean
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    languageButtons: {
        display: "flex"
    },
    languageButton: {
        padding: 0,
        margin: theme.spacing(1)
    },
    languageIcon: {
        width: 60,
        height: 60
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
    const languages = exclusive ?
        oc(langs.data).languages([]).filter(lang => !userLanguages.some(otherLang => otherLang.id === lang!.id)) as Language[] :
        oc(langs.data).languages([]) as Language[]

    if(langs.error || userLangs.error) return <ApolloErrorBox error={langs.error || userLangs.error!} />
    if(langs.loading || userLangs.loading) return <CircularProgress />

    return (
        <div className={classes.languageButtons}>
            {languages && languages.map(language => (
                <Tooltip title={`${t(language.name)} (${language.nativeName})`} key={language.id}>
                    <IconButton className={classes.languageButton} onClick={() => updateLanguage(language)}>
                        <Avatar src={`/static/media/flags/${language.languageCode}.png`}
                                className={classes.languageIcon}/>
                    </IconButton>
                </Tooltip>
            ))}
        </div>
    )
}

export default LargeLanguagePicker
