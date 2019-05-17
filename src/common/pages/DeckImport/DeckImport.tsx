import {Button, Grid, MenuItem, NoSsr, TextField, Typography} from "@material-ui/core"
import {createStyles, makeStyles} from "@material-ui/styles"
import {useEffect, useState} from "react"
import * as React from "react"
import {useTranslation} from "react-i18next"
import initSQL, {Database} from "sql.js"
import {oc} from "ts-optchain"
import useRouter from "use-react-router"
import {
    CardInput,
    Language,
    useAddDeckMutation,
    useLanguageQuery,
    useUserLanguagesQuery
} from "../../../generated/graphql"
import ApolloErrorBox from "../../components/apollo/ApolloErrorBox"
import ErrorBox from "../../components/apollo/ErrorBox"
import {TimedCircularProgress} from "../../components/apollo/TimedCircularProgress"
import ImageUploader from "../../components/common/ImageUploader"
import {loadAsync} from "jszip"
import {useFormState, useID} from "../../hooks"
import {Theme} from "../../theme"

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: theme.spacing(2, 2, 0, 2),
        [theme.breakpoints.up("md")]: {
            padding: theme.spacing(2, 6, 0, 6)
        }
    },
    picker: {
        maxWidth: 400,
        marginTop: theme.spacing(2),
        textAlign: "left"
    },
    mappingGrid: {
        width: "100%",
        maxWidth: 600,
        margin: "0 auto",
        textAlign: "left"
    },
    mappingRoot: {
        width: "100%",
        paddingTop: theme.spacing(2)
    }
}))

interface AnkiDeck {
    id: string
    name: string
}

interface AnkiModel {
    id: string
    name: string
    fields: Array<{
        name: string
        order: number
    }>
}

interface Form {
    deck: string
    model: string
    meaningField: string
    pronunciationField: string
    translationField: string
}

interface Params {
    languageCode: string
    name: string
}

export const DeckImport = () => {
    const classes = useStyles()
    const {t} = useTranslation()
    const {history, match: {params: {languageCode, name}}} = useRouter<Params>()
    const id = useID()

    const [file, setFile] = useState<File | undefined>(undefined)
    const [decks, setDecks] = useState<AnkiDeck[] | undefined>(undefined)
    const [models, setModels] = useState<AnkiModel[] | undefined>(undefined)
    const [db, setDb] = useState<Database | undefined>(undefined)
    const [importing, setImporting] = useState(false)
    const [importError, setImportError] = useState<string | undefined>(undefined)
    const {deck, model, meaningField, pronunciationField, translationField} = useFormState<Form>({deck: "", model: "", meaningField: "", pronunciationField: "", translationField: ""})
    const {data, loading, error} = useLanguageQuery({variables: {languageCode}})
    const userLangs = useUserLanguagesQuery({variables: {userId: id}})
    const nativeLanguage = oc(userLangs.data).user.nativeLanguage() as Language

    useEffect(() => {
        if(!file) return

        setDecks(undefined)
        setModels(undefined)
        deck.set("")
        model.set("")
        loadAsync(file).then(zip => {
            const collection = zip.file("collection.anki2")
            if(!collection) {
                setImportError("Couldn't find anki collection.")
                return
            }
            collection.async("uint8array").then(uint8arr => {
                // noinspection JSUnusedGlobalSymbols
                (initSQL as any)({locateFile: filename => `/${filename}`}).then(SQL => setDb(new SQL.Database(uint8arr)))
            })
        })
    }, [file])

    useEffect(() => {
        if(!db) return

        db.each("SELECT decks, models FROM col", obj => {
            const parsedDeck = JSON.parse(obj.decks as string)
            const newDecks = Object.keys(parsedDeck).map(key => ({id: key, name: parsedDeck[key].name}))
            const parsedModel = JSON.parse(obj.models as string)
            const newModels = Object.keys(parsedModel).map(key => ({id: key, name: parsedModel[key].name, fields: parsedModel[key].flds.map(fld => ({name: fld.name, order: fld.ord}))}))
            setDecks(newDecks)
            setModels(newModels)
            model.set(newModels[0].id)
        }, () => {})
    }, [db])

    const modelObj = models && models.find(otherModel => otherModel.id === model.value)
    const language = oc(data).language()

    const [addDeckMutate, {loading: saving}] = useAddDeckMutation()

    const doImport = () => {
        setImporting(true)
        const mappings = {
            [meaningField.value]: "meaning",
            [pronunciationField.value]: "pronunciation",
            [translationField.value]: "translation"
        }
        const fieldMap: string[] = modelObj!.fields.sort((a, b) => a.order - b.order).map(field => mappings[field.name])
        const queryResult = db!.exec("SELECT flds FROM notes")
        const cards = queryResult[0].values.map(([note]) => {
            const fields = (note as string).split("\x1f")
            const card: CardInput = {}
            fields.forEach((value, index) => {
                const mapping = fieldMap[index]
                if(!mapping) return
                card[mapping] = value
            })
            return card
        })
        setImporting(false)
        addDeckMutate({
            variables: {
                input: {
                    owner: id,
                    name,
                    language: language!.id,
                    nativeLanguage: nativeLanguage.id,
                    cards
                },
                userId: id
            }
        }).then(() => history.push("/settings"))
    }

    const Mapping = ({label, formField}) => (
        <Grid item xs={12} container alignItems="flex-end" justify="flex-start" spacing={2}>
            <Grid item xs={4}>
                <Typography align="right">
                    {t(label)}
                </Typography>
            </Grid>
            <Grid item xs={8}>
                <TextField
                    select
                    label={t("Pick a field")}
                    value={formField.value}
                    onChange={formField.onChange}
                    fullWidth
                >
                    {modelObj!.fields.map(field => (
                        <MenuItem key={field.name} value={field.name}>
                            {`${field.name} - ${field.order + 1}`}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
        </Grid>
    )

    const MappingForm = () => {
        if(loading || userLangs.loading) return <TimedCircularProgress />
        if(error || userLangs.error) return <ApolloErrorBox error={error || userLangs.error} />

        const language = data!.language!
        const hasPronunciation = language.hasPronunciation
        const isDone = meaningField.value !== "" && translationField.value !== "" && (pronunciationField.value !== "" || !hasPronunciation)

        return (
            <div className={classes.mappingRoot}>
                <Typography variant="h5" gutterBottom>{t("Map the Anki Fields to Project Memory fields")}</Typography>
                <Grid container spacing={2} className={classes.mappingGrid}>
                    <Mapping label="Meaning" formField={meaningField} />
                    {hasPronunciation && <Mapping label="Pronunciation" formField={pronunciationField} />}
                    <Mapping label="Translation" formField={translationField} />
                    <Grid item xs={12} container justify="center" alignItems="center">
                        <Grid item>
                            <Button variant="contained" color="primary" disabled={!isDone || importing} onClick={doImport}>
                                {importing ? t("Importing...") : saving ? t("Saving...") : t("Import")}
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        )
    }

    if(importError) return <ErrorBox text={t(importError)} title={t("Parsing error")} />

    return (
        <div>
            <div className={classes.root}>
                <Typography variant="h5" gutterBottom>{t("Drop your Anki collection (.apkg) here")}</Typography>
                <ImageUploader imgExtension={[".apkg"]} withPreview={false} singleImage onChange={files => setFile(files.length > 0 ? files[0] : undefined)} />
                <NoSsr>
                    {decks && (
                        <TextField
                            select
                            helperText={t("Please select a deck")}
                            label={t("Pick a Deck to import")}
                            value={deck.value}
                            onChange={deck.onChange}
                            fullWidth
                            className={classes.picker}
                        >
                            {decks.map(deck => (
                                <MenuItem key={deck.id} value={deck.id}>
                                    {deck.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    )}
                    {models && (
                        <TextField
                            select
                            helperText={t("Please select a model")}
                            label={t("Pick a Card Model to import")}
                            value={model.value}
                            onChange={model.onChange}
                            fullWidth
                            className={classes.picker}
                        >
                            {models.map(model => (
                                <MenuItem key={model.id} value={model.id}>
                                    {model.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    )}
                </NoSsr>
            </div>
            {deck.value !== "" && model.value !== "" && <MappingForm />}
        </div>
    )
}

export default DeckImport
