import {
    Button,
    CircularProgress,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, Grid,
    TextField, Theme, Tooltip
} from "@material-ui/core"
import {createStyles, makeStyles} from "@material-ui/styles"
import {navigate} from "@reach/router"
import {useState} from "react"
import * as React from "react"
import {useTranslation} from "react-i18next"
import {oc} from "ts-optchain"
import {Language, useAddDeckMutation, useUserLanguagesQuery} from "../../../../generated/graphql"
import {useDialog, useID, ValidatorMap} from "../../../hooks"
import {useToast} from "../../../hooks"
import {useValidatedFormState} from "../../../hooks"
import {longerThan, notEmpty, shorterThan} from "../../../util/validationUtils"
import ApolloErrorBox from "../../../components/apollo/ApolloErrorBox"
import WithErrorBox from "../../../components/apollo/WithErrorBox"
import LanguageDisplay from "../LanguageSettings/LanguageDisplay"
import LanguagePicker from "../LanguageSettings/LanguagePicker"

export interface PropTypes {
    closeDialog: () => void
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    form: {
        display: "flex",
        flexDirection: "column",
        [theme.breakpoints.up("sm")]: {
            width: 550
        }
    },
    textField: {
        marginTop: theme.spacing(1)
    },
    nativeLanguage: {
        margin: theme.spacing(0, -1, -1, 0)
    }
}))

interface Form {
    name: string
    language: string
}

const validators: ValidatorMap<Form> = {
    name: [
        {fun: notEmpty, message: "Name cannot be empty"},
        {fun: longerThan(2), message: "Name has to be 3 characters or more"},
        {fun: shorterThan(65), message: "Name has to be 64 characters or less"}
    ]
}
export const CreateDeckForm = ({closeDialog}: PropTypes) => {
    const classes = useStyles()
    const {t} = useTranslation()
    const id = useID()
    const {data, error, loading} = useUserLanguagesQuery({variables: {userId: id}})
    const userLanguages = oc(data).user.languages([]) as Language[]
    const nativeLanguage = oc(data).user.nativeLanguage() as Language

    const {name, language, valid} = useValidatedFormState<Form>({
        name: "",
        language: userLanguages && userLanguages[0].id
    }, validators)

    const {Toast, openToast} = useToast("Successfully created deck")
    const [selectedNativeLanguage, setNativeLanguage] = useState(nativeLanguage)

    const [mutation, {error: mutationError, loading: saving}] = useAddDeckMutation()
    const save = () => {
        mutation({
            variables: {
                input: {
                    owner: id,
                    name: name.value,
                    language: language.value,
                    nativeLanguage: selectedNativeLanguage.id,
                    cards: []
                },
                userId: id
            }
        }).then(() => {
            openToast()
            closeDialog()
        })
    }

    const mutationData = {
        error: mutationError
    }

    const selectedLanguage = userLanguages.find(userLang => userLang.id === language.value)
    const {Dialog, openDialog} = useDialog(LanguagePicker)

    if(error) return <ApolloErrorBox error={error} retry={save} />
    if(loading) return <CircularProgress />

    return (
        <>
            <Dialog />
            <Toast />
            <DialogTitle>{t("Create Deck")}</DialogTitle>
            <DialogContent>
                <WithErrorBox prop={mutationData} retry={save}>
                    <DialogContentText>
                        {t("Enter the deck name and select a language")}
                    </DialogContentText>
                    <form className={classes.form}>
                        <TextField label={t("Name")} value={name.value} onChange={name.onChange} error={!!name.error}
                                   helperText={name.error} className={classes.textField}/>
                        <Grid container alignItems="flex-end">
                            <Grid item xs>
                                <TextField label={t("Language")}
                                           value={language.value}
                                           onChange={language.onChange}
                                           select fullWidth
                                           className={classes.textField}
                                >
                                    {userLanguages.map(lang => (
                                        <option key={lang.id} value={lang.id}>
                                            {`${t(lang.name)} (${lang.nativeName})`}
                                        </option>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item className={classes.nativeLanguage}>
                                <Tooltip title={t("Change")}>
                                    <LanguageDisplay
                                        language={selectedNativeLanguage}
                                        onClick={() => openDialog({buttonText: "Set", onSave: lang => setNativeLanguage(lang)})}
                                        title={t("Native Language")}
                                    />
                                </Tooltip>
                            </Grid>
                        </Grid>
                    </form>
                </WithErrorBox>
            </DialogContent>
            <DialogActions>
                <Button onClick={closeDialog} color="primary">
                    {t("Cancel")}
                </Button>
                <Button onClick={save} color="primary" disabled={saving || !valid}>
                    {t("Save")}
                </Button>
                <Button
                    onClick={() => navigate(`/settings/import-deck/language/${oc(selectedLanguage).languageCode("")}/nativeLanguage/${selectedNativeLanguage.languageCode}/name/${name.value}`)}
                    color="primary"
                    disabled={saving || !valid}
                >
                    {t("Import Anki Deck")}
                </Button>
            </DialogActions>
        </>
    )

}

export default CreateDeckForm
