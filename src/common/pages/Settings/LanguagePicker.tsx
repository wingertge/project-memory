import {
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    Theme
} from "@material-ui/core"
import {createStyles, withStyles, WithStyles} from "@material-ui/styles"
import * as React from "react"
import {withTranslation, WithTranslation} from "react-i18next"
import {compose, pure} from "recompose"
import {
    AddLanguageToUserDocument,
    AddLanguageToUserMutation as Mutation,
    AddLanguageToUserMutationVariables as MutationVariables,
    Language
} from "../../../generated/graphql"
import {
    DialogProps,
    withHandlers, WithID,
    withID,
    WithMutation,
    withMutation,
    withState
} from "../../enhancers"
import LargeLanguageDisplay from "../Intro/LargeLanguageDisplay"
import LargeLanguagePicker from "../Intro/LargeLanguagePicker"

interface PropTypes {
    languages: Language[]
}

interface StateTypes {
    language?: Language
    setLanguage: (language?: Language) => void
}

interface HandlerTypes {
    save: () => void
}

type Props = WithTranslation & WithStyles<typeof styles> & StateTypes & WithID & DialogProps & HandlerTypes & WithMutation & PropTypes

const styles = (theme: Theme) => createStyles({
    title: {
        marginLeft: theme.spacing(1)
    },
    spacer: {
        height: theme.spacing(1)
    }
})

export const LanguagePickerRaw = ({t, classes, language, setLanguage, closeDialog, save}: Props) => (
    <>
        <DialogTitle className={classes.title}>
            {t("Pick a language")}
        </DialogTitle>
        <DialogContent>
            <LargeLanguageDisplay language={language} />
            <div className={classes.spacer} />
            <LargeLanguagePicker updateLanguage={setLanguage} />
        </DialogContent>
        <DialogActions>
            <Button onClick={closeDialog}>{t("Cancel")}</Button>
            <Button onClick={save}>{t("Add")}</Button>
        </DialogActions>
    </>
)

export default compose<Props, PropTypes>(
    pure,
    withStyles(styles),
    withTranslation(),
    withID(),
    withState<Props, Language | undefined>("language", "setLanguage", undefined),
    withMutation<Props, Mutation, MutationVariables>(AddLanguageToUserDocument, ({language, id}) => ({
        userId: id,
        languageId: language!.id
    }), undefined, undefined, {
        optimisticResponse: ({id, language, languages}) => ({
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
    }),
    withHandlers<Props>({
        save: ({closeDialog, submitMutation}) => () => {
            submitMutation()
            closeDialog()
        }
    })
)(LanguagePickerRaw)
