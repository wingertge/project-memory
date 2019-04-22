import {Button, TextField, Theme} from "@material-ui/core"
import {makeStyles} from "@material-ui/styles"
import {ApolloError} from "apollo-client"
import {useState} from "react"
import * as React from "react"
import {useTranslation} from "react-i18next"
import {oc} from "ts-optchain"
import useRouter from "use-react-router/use-react-router"
import {Deck, useDeckDetailsQuery, useUpdateDeckMutation} from "../../../generated/graphql"
import ApolloErrorBox from "../../components/common/ApolloErrorBox"
import Heading from "../../components/common/Heading"
import WithErrorBox from "../../components/common/WithErrorBox"
import {useDialog, useToast, useValidatedFormState, ValidatorMap} from "../../hooks"
import {longerThan, notEmpty, shorterThan} from "../../util/validationUtils"
import CardTable from "./CardTable"
import EditCardForm from "./EditCardForm"
import {Column, SortDirection} from "./DeckDetails"

export type SortDirection = "asc" | "desc"
export type Column = "meaning" | "pronunciation" | "translation"

interface RouteTypes {
    id: string,
    page: string
    sortDirection: SortDirection
    sortBy: Column
}

export interface Form {
    name: string
}

const useStyles = makeStyles((theme: Theme) => ({
    textField: {
        width: 400
    },
    form: {
        margin: theme.spacing(2)
    }
}))


export const deckPropsValidators: ValidatorMap<Form> = {
    name: [
        {fun: notEmpty, message: "Name can't be empty"},
        {fun: longerThan(2), message: "Name needs to be at least 3 characters long"},
        {fun: shorterThan(25), message: "Name needs to be 24 characters or less"}
    ]
}

export const DeckDetails = () => {
    const classes = useStyles()
    const {t} = useTranslation()
    const {match: {params: {id, page: pageString = "0", sortDirection = "asc", sortBy = "meaning"}}} = useRouter<RouteTypes>()
    const page = parseInt(pageString, 10)
    const {Dialog, openDialog} = useDialog(EditCardForm)

    const {data, loading, error} = useDeckDetailsQuery({
        variables: {
            deckID: id
        }
    })

    const deck = data!.deck as Deck

    const {name} = useValidatedFormState<Form>({name: oc(deck).name("")}, deckPropsValidators)

    const [rowsPerPage, setRowsPerPage] = useState<number>(30)
    const [mutationError, setMutationError] = useState<ApolloError | undefined>(undefined)

    const {Toast, openToast} = useToast("Successfully saved profile")

    const updateDeck = useUpdateDeckMutation({variables: {id, deckInput: {name: name.value}}})
    const save = () => updateDeck().then(({errors}) => {
        setMutationError((errors && errors.length > 0 && errors[0] as any) || undefined)
        openToast()
    })

    if(error) return <ApolloErrorBox error={error} />
    if(loading) return null

    return (
        <>
            <Dialog />
            <Toast />
            <WithErrorBox prop={{error: mutationError}} retry={save}>
                <div>
                    <Heading>
                        {t("Edit Deck")}
                    </Heading>
                    <form className={classes.form}>
                        <TextField label={t("Deck Name")} value={name.value} onChange={name.onChange} className={classes.textField}/>
                        <Button onClick={save}>{t("Save")}</Button>
                        <Button onClick={() => openDialog({
                            deckId: id,
                            language: deck.language,
                            nativeLanguage: deck.nativeLanguage,
                            rowsPerPage,
                            page,
                            sortBy,
                            sortDirection
                        })}>{t("Add Cards")}</Button>
                    </form>
                    <CardTable rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} deck={deck} />
                </div>
            </WithErrorBox>
        </>
    )
}

export default DeckDetails
