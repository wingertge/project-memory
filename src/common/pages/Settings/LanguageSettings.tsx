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
import {createStyles, makeStyles} from "@material-ui/styles"
import * as React from "react"
import {useTranslation} from "react-i18next"
import {oc} from "ts-optchain"
import {Language, useRemoveLanguageFromUserMutation, useUserLanguagesQuery} from "../../../generated/graphql"
import ApolloErrorBox from "../../components/common/ApolloErrorBox"
import LanguageDisplay from "../../components/profile/LanguageDisplay"
import {useDialog, useID} from "../../hooks"
import LanguagePicker from "./LanguagePicker"

const useStyles = makeStyles((theme: Theme) => createStyles({
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
}))

export const LanguageSettings = () => {
    const classes = useStyles()
    const {t} = useTranslation()
    const id = useID()
    const {data, loading, error} = useUserLanguagesQuery({variables: {userId: id}})
    const nativeLanguage = oc(data).user.nativeLanguage() as Language
    const languages = oc(data).user.languages([]) as Language[]

    const removeLanguage = (language: Language) => useRemoveLanguageFromUserMutation({
        variables: {userId: id, languageId: language.id},
        optimisticResponse: {
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
        }
    })

    const {Dialog, openDialog} = useDialog(LanguagePicker)

    if(error) return <ApolloErrorBox error={error} />
    if(loading) return <CircularProgress />

    return (
        <>
            <Dialog />
            <CardMedia className={classes.card}>
                <div className={classes.content}>
                    <Typography variant="subtitle1" className={classes.label}>{t("Native Language")}</Typography>
                    <LanguageDisplay language={nativeLanguage}/>
                    <Typography variant="subtitle1" className={classes.label}>{t("Learning Languages")}</Typography>
                    <List className={classes.languageList}>
                        {languages.map(lang => (
                            <ListItem key={lang.id} className={classes.languageListItem}>
                                <LanguageDisplay language={lang} onDelete={() => removeLanguage(lang)}/>
                            </ListItem>
                        ))}
                        <ListItem key="new" className={classes.languageListItem}>
                            <Chip avatar={<Avatar><Add/></Avatar>} onClick={() => openDialog({languages})}
                                  label={t("Add")}/>
                        </ListItem>
                    </List>
                </div>
            </CardMedia>
        </>
    )
}

export default LanguageSettings
