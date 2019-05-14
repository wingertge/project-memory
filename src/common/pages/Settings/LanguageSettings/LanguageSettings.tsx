import {
    Avatar,
    Chip,
    List,
    ListItem, Theme,
    Typography
} from "@material-ui/core"
import {Add} from "@material-ui/icons"
import {createStyles, makeStyles} from "@material-ui/styles"
import * as React from "react"
import {useTranslation} from "react-i18next"
import {oc} from "ts-optchain"
import {
    Language,
    useAddLanguageToUserMutation,
    useRemoveLanguageFromUserMutation, useUpdateProfileMutation,
    useUserLanguagesQuery
} from "../../../../generated/graphql"
import ApolloErrorBox from "../../../components/apollo/ApolloErrorBox"
import LanguageDisplay from "./LanguageDisplay"
import {useDialog, useID, useUser} from "../../../hooks"
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
        paddingRight: theme.spacing(0.5),
        cursor: "pointer"
    },
    content: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
        [theme.breakpoints.down("xs")]: {
            flexDirection: "column",
            alignItems: "flex-start"
        }
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
    const user = useUser()
    const {data, loading, error} = useUserLanguagesQuery({variables: {userId: id}})
    const nativeLanguage = oc(data).user.nativeLanguage() as Language
    const languages = oc(data).user.languages([]) as Language[]

    const removeLanguageMutate = useRemoveLanguageFromUserMutation()
    const removeLanguage = (language: Language) => removeLanguageMutate({
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

    const addLanguageMutate = useAddLanguageToUserMutation()
    const addLanguage = (language: Language) => {
        addLanguageMutate({
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
    }

    const updateProfileMutate = useUpdateProfileMutation()
    const setNativeLanguage = (language: Language) => {
        updateProfileMutate({
            variables: {
                id,
                profile: {
                    nativeLanguage: language.id
                }
            },
            optimisticResponse: {
                __typename: "Mutation",
                editUser: {
                    __typename: "User",
                    ...user,
                    nativeLanguage: {__typename: "Language", ...language}
                }
            }
        })
    }

    const {Dialog, openDialog} = useDialog(LanguagePicker)

    if(error) return <ApolloErrorBox error={error} />
    if(loading || !nativeLanguage) return null

    return (
        <>
            <Dialog />
            <div className={classes.card}>
                <div className={classes.content}>
                    <Typography variant="subtitle1" className={classes.label}>{t("Native Language")}</Typography>
                    {nativeLanguage && <LanguageDisplay language={nativeLanguage} onClick={() => openDialog({onSave: setNativeLanguage, buttonText: "Save"})} />}
                    <Typography variant="subtitle1" className={classes.label}>{t("Learning Languages")}</Typography>
                    <List className={classes.languageList}>
                        {languages.map(lang => (
                            <ListItem key={lang.id} className={classes.languageListItem}>
                                <LanguageDisplay language={lang} onDelete={() => removeLanguage(lang)}/>
                            </ListItem>
                        ))}
                        <ListItem key="new" className={classes.languageListItem}>
                            <Chip avatar={<Avatar><Add/></Avatar>} onClick={() => openDialog({onSave: addLanguage})}
                                  label={t("Add")}/>
                        </ListItem>
                    </List>
                </div>
            </div>
        </>
    )
}

export default LanguageSettings
