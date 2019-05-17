import {
    Button,
    CircularProgress,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField, Theme
} from "@material-ui/core"
import {createStyles, makeStyles} from "@material-ui/styles"
import * as React from "react"
import {useTranslation} from "react-i18next"
import {oc} from "ts-optchain"
import {Language, useAddDeckMutation, useUserLanguagesQuery} from "../../../../generated/graphql"
import {useID, ValidatorMap} from "../../../hooks"
import {useToast} from "../../../hooks"
import {useValidatedFormState} from "../../../hooks"
import {longerThan, notEmpty, shorterThan} from "../../../util/validationUtils"
import ApolloErrorBox from "../../../components/apollo/ApolloErrorBox"
import WithErrorBox from "../../../components/apollo/WithErrorBox"

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

    const [mutation, {error: mutationError, loading: saving}] = useAddDeckMutation({
        variables: {
            input: {
                owner: id,
                name: name.value,
                language: language.value,
                nativeLanguage: nativeLanguage.id,
                cards: []
            },
            userId: id
        }
    })
    const save = () => {
        mutation().then(() => {
            openToast()
            closeDialog()
        })
    }

    const mutationData = {
        error: mutationError
    }

    if(error) return <ApolloErrorBox error={error} retry={save} />
    if(loading) return <CircularProgress />

    return (
        <>
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
                        <TextField label={t("Language")} value={language.value} onChange={language.onChange} select
                                   className={classes.textField}>
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
                <Button onClick={save} color="primary" disabled={saving || !valid}>
                    {t("Save")}
                </Button>
            </DialogActions>
        </>
    )

}

export default CreateDeckForm
