import {
    Avatar,
    CardMedia,
    Chip,
    CircularProgress,
    List,
    ListItem, Theme,
    Typography
} from "@material-ui/core"
import {Add} from "@material-ui/icons"
import {createStyles, WithStyles, withStyles} from "@material-ui/styles"
import * as React from "react"
import {withTranslation, WithTranslation} from "react-i18next"
import {compose, pure} from "recompose"
import {oc} from "ts-optchain"
import {
    Language, RemoveLanguageFromUserDocument,
    RemoveLanguageFromUserMutation,
    RemoveLanguageFromUserMutationVariables,
    withUserLanguages
} from "../../../generated/graphql"
import ErrorBox from "../../components/common/ErrorBox"
import LanguageDisplay from "../../components/profile/LanguageDisplay"
import {
    renderOnError,
    renderWhileLoading,
    WithDialog,
    withDialog,
    withID,
    WithID, WithMutation,
    withMutation
} from "../../enhancers"
import LanguagePicker from "./LanguagePicker"

interface GQLTypes {
    nativeLanguage: Language
    languages: Language[]
}

type Props = WithTranslation & WithID & GQLTypes & WithStyles<typeof styles> & WithDialog<{}> & WithMutation

const styles = (theme: Theme) => createStyles({
    languageList: {
        display: "flex",
        flexDirection: "row",
        padding: 0,
        maxWidth: "100%",
        overflow: "auto"
    },
    languageListItem: {
        width: "inherit",
        padding: 0,
        paddingRight: theme.spacing(0.5)
    },
    content: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    label: {
        margin: theme.spacing(1)
    },
    card: {
        padding: theme.spacing(1)
    }
})

export const LanguageSettingsRaw = ({t, classes, nativeLanguage, languages, openDialog, submitMutation}: Props) => (
    <CardMedia className={classes.card}>
        {/*<Heading>{t("Languages")}</Heading>*/}
        <div className={classes.content}>
            <Typography variant="subtitle1" className={classes.label}>{t("Native Language")}</Typography>
            <LanguageDisplay language={nativeLanguage} />
            <Typography variant="subtitle1" className={classes.label}>{t("Learning Languages")}</Typography>
            <List className={classes.languageList}>
                {languages.map(lang => (
                    <ListItem key={lang.id} className={classes.languageListItem}>
                        <LanguageDisplay language={lang} onDelete={() => submitMutation(lang)} />
                    </ListItem>
                ))}
                <ListItem key="new" className={classes.languageListItem}>
                    <Chip avatar={<Avatar><Add /></Avatar>} onClick={() => openDialog({languages})} label={t("Add")} />
                </ListItem>
            </List>
        </div>
    </CardMedia>
)

export default compose<Props, {}>(
    pure,
    withStyles(styles),
    withTranslation(),
    withID(),
    withUserLanguages<Props, GQLTypes>({
        options: ({id}) => ({
            variables: {
                userId: id
            }
        }),
        props: ({data}) => ({
            data,
            nativeLanguage: oc(data).user.nativeLanguage() as Language,
            languages: oc(data).user.languages([]) as Language[]
        })
    }),
    renderWhileLoading(CircularProgress),
    renderOnError(ErrorBox),
    withMutation<Props, RemoveLanguageFromUserMutation, RemoveLanguageFromUserMutationVariables>(RemoveLanguageFromUserDocument, ({id}) => (language: Language) => ({
        userId: id,
        languageId: language.id
    }), undefined, undefined, {
        optimisticResponse: ({id, languages}) => (language: Language) => ({
            __typename: "Mutation",
            removeLanguageFromUser: {
                __typename: "User",
                id,
                languages: languages.filter(lang => lang.id !== language.id).map(lang => ({
                    __typename: "Language",
                    id: lang.id,
                    name: lang.name,
                    nativeName: lang.nativeName,
                    languageCode: lang.languageCode
                }))
            }
        } as RemoveLanguageFromUserMutation)
    }),
    withDialog<Props, {languages: Language[]}>(LanguagePicker)
)(LanguageSettingsRaw)
