import {
    Button,
    Grid,
    TextField,
    Theme,
    Typography
} from "@material-ui/core"
import {createStyles, makeStyles} from "@material-ui/styles"
import * as React from "react"
import {useTranslation} from "react-i18next"
import {oc} from "ts-optchain"
import {Language, useAddDeckMutation, useUpdateProfileMutation, useUserLanguagesQuery} from "../../../generated/graphql"
import ApolloErrorBox from "../../components/common/ApolloErrorBox"
import {useFormState, useID} from "../../hooks"
import PopularDecks from "./PopularDecks"

interface Form {
    name: string,
    language: string
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    form: {
        height: 64
    },
    textField: {
        width: "calc(60% - 8px)",
        margin: theme.spacing(0.5, 0.5, 2, 0),
        maxWidth: 400,
    },
    select: {
        width: "calc(40% - 8px)",
        margin: theme.spacing(0.5, 1.5, 0.5, 0),
        maxWidth: 300
    },
    button: {
        margin: theme.spacing(2)
    }
}))

export const FirstDeckStep = () => {
    const classes = useStyles()
    const {t} = useTranslation()
    const id = useID()
    const {data, loading, error} = useUserLanguagesQuery({
        variables: {
            userId: id
        }
    })
    const languages = oc(data).user.languages([]) as Language[]
    const nativeLanguage = oc(data).user.nativeLanguage() as Language
    const {name, language} = useFormState<Form>({name: "", language: oc(languages)[0].id("")})

    if(error) return <ApolloErrorBox error={error} />
    if(loading) return null

    const updateProfile = useUpdateProfileMutation({variables: {id, profile: {introStep: 3}}})
    const addDeck = () => useAddDeckMutation({
        variables: {
            input: {
                name: name.value,
                language: language.value,
                nativeLanguage: nativeLanguage.id,
                owner: id,
                cards: []
            }
        }
    })().then(updateProfile)

    return (
        <Grid container direction="column">
            <Grid item xs>
                <Typography variant="h6">
                    {t("Alright, done. Let's create our first deck!")}
                </Typography>
            </Grid>
            <Grid item xs className={classes.form}>
                <TextField label={t("Deck Name")} className={classes.textField} value={name.value} onChange={name.onChange} inputProps={{style: {height: 19}}}/>
                <TextField label={t("Language")} className={classes.textField} value={language.value} onChange={language.onChange} select>
                    {languages.map(lang => (
                        <option key={lang.id} value={lang.id}>
                            {`${t(lang.name)} (${lang.nativeName})`}
                        </option>
                    ))}
                </TextField>
            </Grid>
            <Grid item xs>
                <Button className={classes.button} onClick={addDeck}>{t("Create")}</Button>
            </Grid>
            <Grid item xs>
                <Typography variant="h6">
                    {t("Or you can pick from one of these highly rated community ones.")}
                </Typography>
            </Grid>
            <PopularDecks/>
        </Grid>
    )
}

export default FirstDeckStep
