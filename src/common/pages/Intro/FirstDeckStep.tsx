import {
    Button,
    CircularProgress,
    createStyles,
    Grid,
    TextField,
    Theme,
    Typography,
    withStyles,
    WithStyles
} from "@material-ui/core"
import * as React from "react"
import {withTranslation, WithTranslation} from "react-i18next"
import {compose} from "recompose"
import {oc} from "ts-optchain"
import {
    AddDeckDocument,
    AddDeckMutation,
    AddDeckMutationVariables, Language, UpdateProfileDocument, UpdateProfileMutation, UpdateProfileMutationVariables,
    withUserLanguages
} from "../../../generated/graphql"
import ErrorBox from "../../components/common/ErrorBox"
import {
    renderOnError,
    renderWhileLoading,
    withFormState,
    WithID,
    withID,
    WithMutation,
    withMutation
} from "../../enhancers"
import PopularDecks from "./PopularDecks"

interface FormTypes {
    name: string,
    language: string
}

interface FormHandlerTypes {
    onNameChange: (event) => void
    onLanguageChange: (event) => void
}

interface UserLanguageTypes {
    languages: Language[]
    nativeLanguage: Language
}

interface UpdateProfileTypes {
    submitProfileMutation: () => void
}

type Form = FormTypes & FormHandlerTypes

type Props = WithTranslation & WithStyles<typeof styles> & WithMutation & Form & WithID & UserLanguageTypes & UpdateProfileTypes

const styles = (theme: Theme) => createStyles({
    form: {
        height: 64
    },
    textField: {
        width: "calc(60% - 8px)",
        marginLeft: theme.spacing.unit * 0.5,
        marginRight: theme.spacing.unit * 0.5,
        maxWidth: 400,
        marginTop: theme.spacing.unit * 2
    },
    select: {
        width: "calc(40% - 8px)",
        marginLeft: theme.spacing.unit * 0.5,
        marginRight: theme.spacing.unit * 0.5,
        maxWidth: 300,
        marginTop: theme.spacing.unit * 1.5
    },
    button: {
        margin: theme.spacing.unit * 2
    }
})

export const FirstDeckStepRaw = ({t, classes, name, onNameChange, languages, language, onLanguageChange, submitMutation}: Props) => (
    <Grid container direction="column">
        <Grid item xs>
            <Typography variant="h6">
                {t("Alright, done. Let's create our first deck!")}
            </Typography>
        </Grid>
        <Grid item xs className={classes.form}>
            <TextField label={t("Deck Name")} className={classes.textField} value={name} onChange={onNameChange} inputProps={{style: {height: 19}}} />
            <TextField label={t("Language")} className={classes.textField} value={language} onChange={onLanguageChange} select>
                {languages.map(lang => (
                    <option key={lang.id} value={lang.id}>
                        {`${t(lang.name)} (${lang.nativeName})`}
                    </option>
                ))}
            </TextField>
        </Grid>
        <Grid item xs>
            <Button className={classes.button} onClick={submitMutation}>{t("Create")}</Button>
        </Grid>
        <Grid item xs>
            <Typography variant="h6">
                {t("Or you can pick from one of these highly rated community ones.")}
            </Typography>
        </Grid>
        <PopularDecks />
    </Grid>
)

export default compose<Props, {}>(
    withStyles(styles),
    withTranslation(),
    withID<Props>(),
    withUserLanguages<Props, UserLanguageTypes>({
        options: ({id}) => ({
            variables: {
                userId: id
            }
        }),
        props: ({data}) => ({
            data,
            languages: oc(data).user.languages([]) as Language[],
            nativeLanguage: oc(data).user.nativeLanguage() as Language
        })
    }),
    renderWhileLoading(CircularProgress),
    renderOnError(ErrorBox),
    withFormState<FormTypes, Props>(({languages}) => ({name: "", language: oc(languages)[0].id("")})),
    withMutation<Props, UpdateProfileMutation, UpdateProfileMutationVariables>(UpdateProfileDocument, ({id}) => ({id, profile: {introStep: 3}}), undefined, undefined, {submitName: "submitProfileMutation"}),
    withMutation<Props, AddDeckMutation, AddDeckMutationVariables>(AddDeckDocument, ({id, name, language, nativeLanguage}) => ({
        input: {
            name,
            language,
            nativeLanguage: nativeLanguage.id,
            owner: id,
            cards: []
        }
    }), ({submitProfileMutation}) => submitProfileMutation())
)(FirstDeckStepRaw)
