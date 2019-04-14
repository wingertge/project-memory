import {
    Avatar,
    CircularProgress,
    IconButton,
    Theme,
    Tooltip
} from "@material-ui/core"
import {createStyles, withStyles, WithStyles} from "@material-ui/styles"
import * as React from "react"
import {withTranslation, WithTranslation} from "react-i18next"
import {compose} from "recompose"
import {oc} from "ts-optchain"
import {Language, withLanguages, withUserLanguages} from "../../../generated/graphql"
import ErrorBox from "../../components/common/ErrorBox"
import {renderOnError, renderWhileLoading, withUser, WithUser} from "../../enhancers"

interface PropTypes {
    updateLanguage: (state: Language) => void
    exclusive?: boolean
}

interface LanguagesGQLTypes {
    langsData: any
    languages: Language[]
}

interface UserLanguagesTypes {
    userLangsData: any
    userLanguages: Language[]
}

type Props = WithUser & LanguagesGQLTypes & WithStyles<typeof styles> & WithTranslation & PropTypes & UserLanguagesTypes

const styles = (theme: Theme) => createStyles({
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
})

export const LargeLanguagePickerRaw = ({t, classes, languages, updateLanguage}: Props) => (
    <div className={classes.languageButtons}>
        {languages && languages.map(language => (
            <Tooltip title={`${t(language.name)} (${language.nativeName})`} key={language.id}>
                <IconButton className={classes.languageButton} onClick={() => updateLanguage(language)}>
                    <Avatar src={`/static/media/flags/${language.languageCode}.png`} className={classes.languageIcon} />
                </IconButton>
            </Tooltip>
        ))}
    </div>
)

export default compose<Props, PropTypes>(
    withStyles(styles),
    withTranslation(),
    withUser<Props>(),
    withUserLanguages<Props, UserLanguagesTypes>({
        options: ({user}) => ({
            variables: {
                userId: user.id
            }
        }),
        props: ({data}) => ({
            userLangsData: data,
            userLanguages: oc(data).user.languages([]) as Language[]
        })
    }),
    withLanguages<Props, LanguagesGQLTypes>({
        props: ({data, ownProps: {userLanguages, exclusive}}) => ({
            langsData: data,
            languages: exclusive ? oc(data).languages([]).filter(lang => !userLanguages.some(otherLang => otherLang.id === lang!.id)) as Language[] : oc(data).languages([]) as Language[]
        })
    }),
    renderOnError(ErrorBox, "langsData"),
    renderWhileLoading(CircularProgress, "langsData"),
    renderOnError(ErrorBox, "userLangsData"),
    renderWhileLoading(CircularProgress, "userLangsData")
)(LargeLanguagePickerRaw)
