/*
The following is the license for the Project Memory Frontend, a frontend for the Project Memory web app.
Copyright (C) 2019  Genna Wingert

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

import {
    Button,
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
import {
    Card,
    Language, ReviewsCountDocument,
    useAddCardMutation,
    useUpdateCardMutation
} from "../../../generated/graphql"
import ApolloErrorBox from "../../components/apollo/ApolloErrorBox"
import {useID, useToast, useValidatedFormState, ValidatorMap} from "../../hooks"
import {shorterThan} from "../../util/validationUtils"
import {Column, SortDirection} from "./DeckDetails"

export interface PropTypes {
    closeDialog: () => void
    card?: Card
    deckId: string
    language: Language
    nativeLanguage: Language
    rowsPerPage: number
    page: number
    sortDirection: SortDirection
    sortBy: Column
    cards: Card[]
    search: string
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
    },
    useIme: {
        imeMode: "active",
        "-webkit-ime-mode": "active",
        "-moz-ime-mode": "active",
        "-ms-ime-mode": "active"
    },
    disableIme: {
        imeMode: "inactive",
        "-webkit-ime-mode": "inactive",
        "-moz-ime-mode": "inactive",
        "-ms-ime-mode": "inactive"
    }
}))

const validators: ValidatorMap<Form> = {
    meaning: [{fun: shorterThan(401), message: "Can't enter more than 400 characters"}],
    pronunciation: [{fun: shorterThan(401), message: "Can't enter more than 400 characters"}],
    translation: [{fun: shorterThan(401), message: "Can't enter more than 400 characters"}]
}

export const EditCardForm = ({closeDialog, card, deckId, rowsPerPage, page, sortDirection, sortBy, language, nativeLanguage, cards, search}: PropTypes) => {
    const classes = useStyles()
    const {t} = useTranslation()
    const {Toast, openToast} = useToast(`Successfully ${card ? "updated" : "created"} card`)
    //const langConverter = converter(language.languageCode)
    const {meaning, pronunciation, translation, valid} = useValidatedFormState<Form>({
        meaning: oc(card).meaning(""),
        pronunciation: oc(card).pronunciation(""),
        translation: oc(card).translation("")
    }, validators)
    const meaningRef: any = React.createRef()
    const pronunciationRef: any = React.createRef()
    const translationRef: any = React.createRef()
    const userId = useID()

    const onSaved = () => {
        //openToast()
        if(card) {
            openToast()
            closeDialog()
        }
    }

    const [addCardMutate, {loading: addCardSaving}] = useAddCardMutation({
        variables: {
            card: {
                meaning: meaning.value,
                pronunciation: pronunciation.value,
                translation: translation.value,
                deck: deckId
            },
            limit: rowsPerPage,
            offset: page * rowsPerPage,
            sort: {
                sortBy,
                sortDirection
            },
            filter: {
                search: search.trim().length > 0 ? search : undefined
            }
        },
        optimisticResponse: {
            __typename: "Mutation",
            createCard: {
                __typename: "Deck",
                id: deckId,
                cards: [...cards, {__typename: "Card", id: "asd", meaning: meaning.value, pronunciation: pronunciation.value, translation: translation.value}]
            }
        },
        refetchQueries: [
            {query: ReviewsCountDocument, variables: {userId, filter: {box: {eq: 0}}}}
        ]
    })

    const addCard = () => {
        addCardMutate().then(onSaved)
        if(!card) {
            meaning.set("")
            pronunciation.set("")
            translation.set("");
            (document.querySelector("#meaning") as any).focus()
        }
    }

    const [editCardMutate, {loading: editCardSaving, error}] = useUpdateCardMutation({
        variables: {
            id: oc(card).id()!,
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
                id: oc(card).id()!,
                meaning: meaning.value,
                pronunciation: pronunciation.value,
                translation: translation.value
            }
        }
    })

    const editCard = () => {
        editCardMutate().then(onSaved)
    }

    const submit = () => {
        if(card) editCard()
        else addCard()
    }

    const onKeyPress = (refToFocus?: string) => event => {
        if(event.key === "Enter") {
            event.preventDefault()
            refToFocus ? (document.querySelector(refToFocus)! as any).focus() : submit()
        }
    }

    const saving = editCardSaving || addCardSaving

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
                               inputProps={{"data-lpignore": true, autoComplete: "off", id: "meaning"}} autoFocus
                               onKeyPress={onKeyPress(language.hasPronunciation ? "#pronunciation" : "#translation")} inputRef={meaningRef} type={nativeLanguage.requiresIME ? "text" : "tel"}
                               className={nativeLanguage.requiresIME ? classes.useIme : classes.disableIme}
                               error={!!meaning.error} helperText={meaning.error}
                    />
                    {language.hasPronunciation && (
                        <TextField label={t("Pronunciation")} value={pronunciation.value} onChange={pronunciation.onChange}
                                   inputProps={{"data-lpignore": true, autoComplete: "off", id: "pronunciation"}}
                                   onKeyPress={onKeyPress("#translation")} inputRef={pronunciationRef}
                                   type={language.requiresIME ? "text" : "tel"}
                                   className={language.requiresIME ? classes.useIme : classes.disableIme}
                                   error={!!pronunciation.error} helperText={pronunciation.error}
                        />
                    )}
                    <TextField label={t("Translation")} value={translation.value} onChange={translation.onChange}
                               inputProps={{"data-lpignore": true, autoComplete: "off", id: "translation"}}
                               onKeyPress={onKeyPress(undefined)} inputRef={translationRef}
                               type={language.requiresIME ? "text" : "tel"}
                               className={language.requiresIME ? classes.useIme : classes.disableIme}
                               error={!!translation.error} helperText={translation.error}
                    />
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={closeDialog} color="primary" type="reset">
                    {t("Close")}
                </Button>
                <Button onClick={submit} color="primary" disabled={saving || !valid} type="submit">
                    {card ? t("Save") : t("Add")}
                </Button>
            </DialogActions>
        </>
    )
}

export default EditCardForm
