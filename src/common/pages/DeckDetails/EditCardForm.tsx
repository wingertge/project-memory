import {
    Button,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField, Theme
} from "@material-ui/core"
import {createStyles, makeStyles} from "@material-ui/styles"
import {ApolloError} from "apollo-client"
import {useState} from "react"
import * as React from "react"
import {FetchResult} from "react-apollo"
import {useTranslation} from "react-i18next"
import {oc} from "ts-optchain"
import {Card, useAddCardMutation, useUpdateCardMutation} from "../../../generated/graphql"
import ApolloErrorBox from "../../components/common/ApolloErrorBox"
import {useFormState, useToast} from "../../hooks"
import {Column, SortDirection} from "./DeckDetails"

export interface PropTypes {
    closeDialog: () => void
    card?: Card
    deckId: string
    rowsPerPage: number
    page: number
    sortDirection: SortDirection
    sortBy: Column
}

interface Form {
    meaning: string
    pronunciation: string
    translation: string
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    form: {
        display: "flex",
        flexDirection: "column",
        [theme.breakpoints.up("sm")]: {
            width: 550
        }
    }
}))

export const EditCardForm = ({closeDialog, card, deckId, rowsPerPage, page, sortDirection, sortBy}: PropTypes) => {
    const classes = useStyles()
    const {t} = useTranslation()
    const {Toast, openToast} = useToast(`Successfully ${card ? "updated" : "created"} card`)
    const {meaning, pronunciation, translation} = useFormState<Form>({
        meaning: oc(card).meaning(""),
        pronunciation: oc(card).pronunciation(""),
        translation: oc(card).translation("")
    })
    const [meaningRef, pronunciationRef, translationRef]: any[] = [React.createRef(), React.createRef(), React.createRef()]
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState<ApolloError | undefined>(undefined)

    const onSaved = ({errors}: FetchResult<any>) => {
        setSaving(false)
        setError((errors && errors.length > 0 && errors[0] as any) || undefined)
        openToast()
        if(card) {
            closeDialog()
        } else {
            meaning.set("")
            pronunciation.set("")
            translation.set("")
            meaningRef.current.focus()
        }
    }

    const mutateAddCard = useAddCardMutation({
        variables: {
            card: {
                meaning: meaning.value,
                pronunciation: pronunciation.value,
                translation: translation.value,
                deck: deckId
            },
            cardFilter: {
                limit: rowsPerPage,
                offset: page * rowsPerPage,
                sortBy,
                sortDirection
            }
        }
    })
    const addCard = () => {
        setSaving(true)
        mutateAddCard().then(onSaved)
    }

    const mutateEditCard = useUpdateCardMutation({
        variables: {
            id: card!.id,
            card: {
                meaning: meaning.value,
                pronunciation: pronunciation.value,
                translation: translation.value
            }
        },
        optimisticResponse: {
            __typename: "Mutation",
            editCard: {
                __typename: "Card",
                id: card!.id,
                meaning: meaning.value,
                pronunciation: pronunciation.value,
                translation: translation.value
            }
        }
    })
    const editCard = () => {
        setSaving(true)
        mutateEditCard().then(onSaved)
    }

    const submit = () => {
        if(card) editCard()
        else addCard()
    }

    const onKeyPress = (refToFocus: any) => event => {
        if(event.key === "Enter") {
            event.preventDefault()
            refToFocus ? refToFocus.current.focus() : submit()
        }
    }

    return (
        <>
            {error && <ApolloErrorBox error={error} retry={submit} />}
            <Toast />
            <DialogTitle>
                {card ? t("Edit Card") : t("Add Card")}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {card ? t("Edit this card") : t("Add a new card to the deck")}
                </DialogContentText>
                <form className={classes.form}>
                    <TextField label={t("Meaning")} value={meaning.value} onChange={meaning.onChange}
                               inputProps={{"data-lpignore": true, autoComplete: "off"}} autoFocus
                               onKeyPress={onKeyPress(pronunciationRef)} inputRef={meaningRef}/>
                    <TextField label={t("Pronunciation")} value={pronunciation.value} onChange={pronunciation.onChange}
                               inputProps={{"data-lpignore": true, autoComplete: "off"}}
                               onKeyPress={onKeyPress(translationRef)} inputRef={pronunciationRef}/>
                    <TextField label={t("Translation")} value={translation.value} onChange={translation.onChange}
                               inputProps={{"data-lpignore": true, autoComplete: "off"}}
                               onKeyPress={onKeyPress(null)} inputRef={translationRef}/>
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={closeDialog} color="primary" type="cancel">
                    {t("Close")}
                </Button>
                <Button onClick={submit} color="primary" disabled={saving} type="submit">
                    {card ? t("Save") : t("Add")}
                </Button>
            </DialogActions>
        </>
    )
}

export default EditCardForm
