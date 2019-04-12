import {createStyles, Theme, Typography, withStyles, WithStyles} from "@material-ui/core"
import * as React from "react"
import {MutationFn} from "react-apollo"
import {withTranslation, WithTranslation} from "react-i18next"
import {compose} from "recompose"
import {
    Language,
    AddLanguageToUserDocument,
    AddLanguageToUserMutation as Mutation,
    AddLanguageToUserMutationVariables as MutationVariables,
    withUpdateProfile,
    UpdateProfileMutation,
    UpdateProfileMutationVariables
} from "../../../generated/graphql"
import {withHandlers, withMutation, WithMutation, withState, withUser, WithUser} from "../../enhancers"
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

interface UpdateProfileTypes {
    updateProfile: MutationFn<UpdateProfileMutation, UpdateProfileMutationVariables>
}

type Form = FormTypes & FormHandlerTypes

type Props = WithTranslation & WithUser & WithStyles<typeof styles> & Form & WithMutation & HandlerTypes & UpdateProfileTypes

const styles = (theme: Theme) => createStyles({
    titleContainer: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    spacer: {
        width: theme.spacing.unit * 2
    }
})

export const LearningLanguageStepRaw = ({t, classes, language, pickLanguage}: Props) => (
    <>
        <div className={classes.titleContainer}>
            <Typography variant="h6">
                {t("Great! Now for a language you'd like to learn. Don't worry, you can change this or add more later.")}
            </Typography>
            <div className={classes.spacer} />
            <LargeLanguageDisplay language={language} />
        </div>
        <LargeLanguagePicker updateLanguage={pickLanguage} exclusive />
    </>
)

export default compose<Props, {}>(
    withStyles(styles),
    withTranslation(),
    withUser<Props>(),
    withState<Props, Language | undefined>("language", "updateLanguage", undefined),
    withMutation<Props, Mutation, MutationVariables>(AddLanguageToUserDocument, ({language, user: {id}}) => ({
        userId: id,
        languageId: language!.id
    })),
    withUpdateProfile<Props>({
        options: ({user}) => ({
            variables: {
                id: user.id,
                profile: {
                    introStep: 2
                }
            }
        }),
        name: "updateProfile"
    }),
    withHandlers<Props>({
        pickLanguage: ({updateLanguage, submitMutation, updateProfile, user}) => language => {
            updateLanguage(language)
            setTimeout(() => {
                submitMutation()
                updateProfile({
                    variables: {
                        id: user.id,
                        profile: {
                            introStep: 2
                        }
                    }
                })
            }, 800)
        }
    })
)(LearningLanguageStepRaw)
