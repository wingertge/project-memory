import {Theme, Typography} from "@material-ui/core"
import {createStyles, makeStyles} from "@material-ui/styles"
import {useState} from "react"
import * as React from "react"
import {useTranslation} from "react-i18next"
import {oc} from "ts-optchain"
import {Language, useUpdateProfileMutation} from "../../../generated/graphql"
import {useUser} from "../../hooks"
import LargeLanguageDisplay from "./LargeLanguageDisplay"
import LargeLanguagePicker from "./LargeLanguagePicker"

const useStyles = makeStyles((theme: Theme) => createStyles({
    titleContainer: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    spacer: {
        width: theme.spacing(2)
    }
}))

export const NativeLanguageStep = () => {
    const classes = useStyles()
    const {t} = useTranslation()
    const {id, username} = useUser()
    const [language, setLanguage] = useState<Language | undefined>(undefined)
    const updateProfile = useUpdateProfileMutation({
        variables: {
            id,
            profile: {
                nativeLanguage: oc(language).id(""),
                introStep: 1
            }
        }
    })
    const pickLanguage = (lang: Language) => {
        setLanguage(lang)
        setTimeout(updateProfile, 800)
    }

    return (
        <>
            <div className={classes.titleContainer}>
                <Typography variant="h6">
                    {t("Hello, {{username}}! Welcome to Project Memory (dun dun dun). How about you pick your native language to start with?", {username})}
                </Typography>
                <div className={classes.spacer}/>
                <LargeLanguageDisplay language={language}/>
            </div>
            <LargeLanguagePicker updateLanguage={pickLanguage}/>
        </>
    )
}

export default NativeLanguageStep
