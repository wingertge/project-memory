import {Theme, Typography} from "@material-ui/core"
import {createStyles, withStyles, WithStyles} from "@material-ui/styles"
import * as React from "react"
import {withTranslation, WithTranslation} from "react-i18next"
import {compose, pure} from "recompose"
import {
    Language,
    UpdateProfileDocument,
    UpdateProfileMutation as Mutation,
    UpdateProfileMutationVariables as MutationVariables
} from "../../../generated/graphql"
import {withHandlers, WithMutation, withMutation, withState, WithUser, withUser} from "../../enhancers"
import LargeLanguageDisplay from "./LargeLanguageDisplay"
import LargeLanguagePicker from "./LargeLanguagePicker"

interface FormTypes {
    language?: Language
}

interface FormHandlerTypes {
    updateLanguage: (state?: Language) => Language | undefined
}

interface HandlerTypes {
    pickLanguage: (language: Language) => void
}

type Form = FormTypes & FormHandlerTypes

type Props = WithTranslation & WithUser & WithStyles<typeof styles> & Form & WithMutation & HandlerTypes

const styles = (theme: Theme) => createStyles({
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
})

export const NativeLanguageStepRaw = ({t, classes, user: {username}, language, pickLanguage}: Props) => (
    <>
        <div className={classes.titleContainer}>
            <Typography variant="h6">
                {t("Hello, {{username}}! Welcome to Project Memory (dun dun dun). How about you pick your native language to start with?", {username})}
            </Typography>
            <div className={classes.spacer} />
            <LargeLanguageDisplay language={language} />
        </div>
        <LargeLanguagePicker updateLanguage={pickLanguage} />
    </>
)

export default compose<Props, {}>(
    pure,
    withStyles(styles),
    withTranslation(),
    withUser<Props>(),
    withState<Props, Language | undefined>("language", "updateLanguage", undefined),
    withMutation<Props, Mutation, MutationVariables>(UpdateProfileDocument, ({language, user: {id}}) => ({
        id,
        profile: {
            nativeLanguage: language!.id,
            introStep: 1
        }
    })),
    withHandlers<Props>({
        pickLanguage: ({updateLanguage, submitMutation}) => language => {
            updateLanguage(language)
            setTimeout(submitMutation, 800)
        }
    })
)(NativeLanguageStepRaw)
