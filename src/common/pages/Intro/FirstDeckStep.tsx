import {
    Button,
    Grid,
    TextField,
    Theme,
    Typography
} from "@material-ui/core"
import {createStyles, makeStyles} from "@material-ui/styles"
import {useState} from "react"
import * as React from "react"
import Helmet from "react-helmet"
import {useTranslation} from "react-i18next"
import {oc} from "ts-optchain"
import {
    Deck,
    Language,
    useAddDeckMutation,
    useGlobalDecksQuery,
    useUpdateProfileMutation,
    useUserLanguagesQuery
} from "../../../generated/graphql"
import ApolloErrorBox from "../../components/apollo/ApolloErrorBox"
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
    const [saving, setSaving] = useState(false)

    const updateProfile = useUpdateProfileMutation({variables: {id, profile: {introStep: 3}}})
    const addDeckMutation = useAddDeckMutation({
        variables: {
            input: {
                name: name.value,
                language: language.value,
                nativeLanguage: nativeLanguage && nativeLanguage.id,
                owner: id,
                cards: []
            },
            userId: id
        }
    })
    const addDeck = () => {
        setSaving(true)
        addDeckMutation().then(() => updateProfile().then(() => setSaving(false)))
    }

    const globalDecks = useGlobalDecksQuery({
        variables: {
            filter: {
                sortBy: "rating",
                sortDirection: "desc",
                limit: 20,
                languages: languages.map(lang => lang.id),
                nativeLanguage: oc(nativeLanguage).id()
            },
            userId: id
        }
    })
    const decks = oc(globalDecks.data).decks([]) as Deck[]

    if(error || globalDecks.error) return <ApolloErrorBox error={error || globalDecks.error} />
    if(loading || globalDecks.loading) return null

    return (
        <Grid container direction="column">
            <Helmet>
                <title>{t("First Deck - Project Memory")}</title>
            </Helmet>
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
                <Button className={classes.button} onClick={addDeck} disabled={saving} color="primary">{t("Create")}</Button>
            </Grid>
            <Grid item xs>
                <Typography variant="h6">
                    {t("Or you can pick from one of these highly rated community ones.")}
                </Typography>
            </Grid>
            <PopularDecks decks={decks} onSave={updateProfile} />
        </Grid>
    )
}

export default FirstDeckStep
