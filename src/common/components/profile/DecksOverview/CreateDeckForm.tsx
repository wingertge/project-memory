import {
    Button,
    CircularProgress, createStyles,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField, Theme, withStyles, WithStyles
} from "@material-ui/core"
import * as React from "react"
import {withTranslation, WithTranslation} from "react-i18next"
import {compose} from "recompose"
import {oc} from "ts-optchain"
import {
    AddDeckDocument,
    AddDeckMutation,
    AddDeckMutationVariables,
    Language,
    withUserLanguages
} from "../../../../generated/graphql"
import {
    FormWithErrors, renderOnError, renderWhileLoading,
    ValidatorMap,
    WithID,
    withID,
    WithMutation,
    withMutation,
    withToast,
    withValidatedFormState
} from "../../../enhancers"
import {longerThan, notEmpty, shorterThan} from "../../../util/validationUtils"
import ErrorBox from "../../common/ErrorBox"
import WithErrorBox from "../../common/WithErrorBox"
import _ from "lodash"

export interface PropTypes {
    closeDialog: () => void
}

interface UserLanguagesTypes {
    userLanguages: Language[]
    nativeLanguage: Language
}

interface FormTypes {
    name: string,
    language: string
}

interface FormHandlerTypes {
    onNameChange: (event) => void
    onLanguageChange: (event) => void
}

type Props = WithTranslation & UserLanguagesTypes & WithID & FormTypes & WithMutation & PropTypes & FormHandlerTypes & FormWithErrors<FormTypes> & WithStyles<typeof styles>

const styles = (theme: Theme) => createStyles({
    form: {
        display: "flex",
        flexDirection: "column",
        [theme.breakpoints.up("sm")]: {
            width: 550
        }
    },
    textField: {
        marginTop: theme.spacing.unit
    }
})

const CreateDeckFormRaw = ({t, classes, submitMutation, mutationData, userLanguages, name, onNameChange, language, onLanguageChange, errors, closeDialog}: Props) => (
    <>
        <DialogTitle>{t("Create Deck")}</DialogTitle>
        <DialogContent>
            <WithErrorBox prop={mutationData} retry={submitMutation}>
                <DialogContentText>
                    {t("Enter the deck name and select a language")}
                </DialogContentText>
                <form className={classes.form}>
                    <TextField label={t("Name")} value={name} onChange={onNameChange} error={!!errors.name} helperText={errors.name} className={classes.textField} />
                    <TextField label={t("Language")} value={language} onChange={onLanguageChange} select className={classes.textField}>
                        {userLanguages.map(lang => (
                            <option key={lang.id} value={lang.id}>
                                {`${t(lang.name)} (${lang.nativeName})`}
                            </option>
                        ))}
                    </TextField>
                </form>
            </WithErrorBox>
        </DialogContent>
        <DialogActions>
            <Button onClick={closeDialog} color="primary">
                {t("Cancel")}
            </Button>
            <Button onClick={submitMutation} color="primary" disabled={mutationData.saving || !_.isEmpty(errors)}>
                {t("Save")}
            </Button>
        </DialogActions>
    </>
)

const validators: ValidatorMap<FormTypes> = {
    name: [
        {fun: notEmpty, message: "Name cannot be empty"},
        {fun: longerThan(2), message: "Name has to be 3 characters or more"},
        {fun: shorterThan(65), message: "Name has to be 64 characters or less"}
    ]
}

export default compose<Props, PropTypes>(
    withStyles(styles),
    withTranslation(),
    withID(),
    withUserLanguages<Props, UserLanguagesTypes>({
        options: ({id}) => ({
            variables: {
                userId: id
            }
        }),
        props: ({data}) => ({
            data,
            userLanguages: oc(data).user.languages([]) as Language[],
            nativeLanguage: oc(data).user.nativeLanguage() as Language
        })
    }),
    withValidatedFormState<FormTypes & FormWithErrors<FormTypes>, Props>(({userLanguages}) => ({
        name: "",
        language: userLanguages && userLanguages[0].id
    }), validators),
    withMutation<Props, AddDeckMutation, AddDeckMutationVariables>(AddDeckDocument, ({id, name, language, nativeLanguage}) => ({
        input: {
            owner: id,
            name,
            language,
            nativeLanguage: nativeLanguage.id,
            cards: []
        }
    }), ({closeDialog}) => closeDialog()),
    withToast("Successfully created deck"),
    renderWhileLoading(CircularProgress),
    renderOnError(ErrorBox)
)(CreateDeckFormRaw)
