import {
    Button,
    createStyles,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField, Theme, WithStyles, withStyles
} from "@material-ui/core"
import * as React from "react"
import {withTranslation, WithTranslation} from "react-i18next"
import {compose, pure, withHandlers, withProps} from "recompose"
import {oc} from "ts-optchain"
import {
    AddCardDocument,
    AddCardMutation, AddCardMutationVariables,
    Card, UpdateCardDocument, UpdateCardMutation, UpdateCardMutationVariables
} from "../../../generated/graphql"
import {withErrorBox, withFormState, withMutation, WithToast, withToast} from "../../enhancers"
import {Column, SortDirection} from "./types"

export interface PropTypes {
    closeDialog: () => void
    card?: Card
    deckId: string
    rowsPerPage: number
    page: number
    sortDirection: SortDirection
    sortBy: Column
}

interface FormTypes {
    meaning: string
    pronunciation?: string
    translation: string
}

interface FormHandlerTypes {
    onMeaningChange: (event) => void
    onPronunciationChange: (event) => void
    onTranslationChange: (event) => void
}

interface FormUpdaterTypes {
    updateMeaning: (state: string) => void
    updatePronunciation: (state: string) => void
    updateTranslation: (state: string) => void
}

interface HandlerTypes {
    onSubmit: () => void
    onSaved: () => void
    onMeaningKeyPress: (event) => void
    onPronunciationKeyPress: (event) => void
    onTranslationKeyPress: (event) => void
}

interface SpecialTypes {
    focusMeaning: () => void
    focusPronunciation: () => void
    focusTranslation: () => void
    meaningRef: any
    pronunciationRef: any
    translationRef: any
}

interface MutationTypes {
    createCard: () => void
    editCard: () => void
    mutationData: any
}

type Form = FormTypes & FormHandlerTypes & FormUpdaterTypes
type Props = WithTranslation & PropTypes & Form & WithStyles<typeof styles> & HandlerTypes & MutationTypes & WithToast & SpecialTypes

const styles = (theme: Theme) => createStyles({
    form: {
        display: "flex",
        flexDirection: "column",
        [theme.breakpoints.up("sm")]: {
            width: 550
        }
    }
})

const EditCardForm = (
    {t, classes, closeDialog, card, meaning, pronunciation, translation, onSubmit, mutationData: {saving},
        onMeaningChange, onPronunciationChange, onTranslationChange,
        onMeaningKeyPress, onPronunciationKeyPress, onTranslationKeyPress,
        meaningRef, pronunciationRef, translationRef}: Props
) => (
    <>
        <DialogTitle>
            {card ? t("Edit Card") : t("Add Card")}
        </DialogTitle>
        <DialogContent>
            <DialogContentText>
                {card ? t("Edit this card") : t("Add a new card to the deck")}
            </DialogContentText>
            <form className={classes.form}>
                <TextField label={t("Meaning")} value={meaning} onChange={onMeaningChange} inputProps={{"data-lpignore": true, autoComplete: "off"}} autoFocus onKeyPress={onMeaningKeyPress} inputRef={meaningRef} />
                <TextField label={t("Pronunciation")} value={pronunciation} onChange={onPronunciationChange} inputProps={{"data-lpignore": true, autoComplete: "off"}} onKeyPress={onPronunciationKeyPress} inputRef={pronunciationRef} />
                <TextField label={t("Translation")} value={translation} onChange={onTranslationChange} inputProps={{"data-lpignore": true, autoComplete: "off"}} onKeyPress={onTranslationKeyPress} inputRef={translationRef} />
            </form>
        </DialogContent>
        <DialogActions>
            <Button onClick={closeDialog} color="primary" type="cancel">
                {t("Close")}
            </Button>
            <Button onClick={onSubmit} color="primary" disabled={saving} type="submit">
                {card ? t("Save") : t("Add")}
            </Button>
        </DialogActions>
    </>
)

export default compose<Props, PropTypes>(
    pure,
    withStyles(styles),
    withTranslation(),
    withToast<Props>(({card}) => `Successfully ${card ? "updated" : "created"} card`),
    withFormState<FormTypes, Props>(({card}) => ({
        meaning: oc(card).meaning(""),
        pronunciation: oc(card).pronunciation(""),
        translation: oc(card).translation("")
    })),
    withProps<Partial<SpecialTypes>, Props>({
        meaningRef: React.createRef(),
        pronunciationRef: React.createRef(),
        translationRef: React.createRef()
    }),
    withHandlers<Props, Partial<SpecialTypes>>({
        focusMeaning: ({meaningRef}) => () => meaningRef.current.focus(),
        focusPronunciation: ({pronunciationRef}) => () => pronunciationRef.current.focus(),
        focusTranslation: ({translationRef}) => () => translationRef.current.focus()
    }),
    withHandlers<Props, Partial<HandlerTypes>>({
        onSaved: ({card, closeDialog, updateMeaning, updatePronunciation, updateTranslation, openToast, focusMeaning}) => () => {
            openToast()
            if(card) {
                closeDialog()
            } else {
                updateMeaning("")
                updatePronunciation("")
                updateTranslation("")
                focusMeaning()
            }
        }
    }),
    withMutation<Props, AddCardMutation, AddCardMutationVariables>(AddCardDocument, ({deckId, meaning, pronunciation, translation, rowsPerPage, page, sortBy, sortDirection}) => ({
        card: {
            meaning,
            pronunciation,
            translation,
            deck: deckId
        },
        cardFilter: {
            limit: rowsPerPage,
            offset: page * rowsPerPage,
            sortBy,
            sortDirection
        }
    }), ({onSaved}) => onSaved(), undefined, {submitName: "createCard"}),
    withMutation<Props, UpdateCardMutation, UpdateCardMutationVariables>(UpdateCardDocument, ({card, meaning, pronunciation, translation}) => ({
        id: card!.id,
        card: {
            meaning,
            pronunciation,
            translation
        }
    }), ({onSaved}) => onSaved(), undefined, {
        submitName: "editCard",
        optimisticResponse: ({card, meaning, pronunciation, translation}) => ({
            __typename: "Mutation",
            editCard: {
                __typename: "Card",
                id: card!.id,
                meaning,
                pronunciation,
                translation
            }
        })
    }),
    withHandlers<Props, Partial<HandlerTypes>>({
        onSubmit: ({createCard, editCard, card}) => () => {
            if(card) editCard()
            else createCard()
        }
    }),
    withHandlers<Props, Partial<HandlerTypes>>({
        onMeaningKeyPress: ({focusPronunciation}) => event => {
            if(event.key === "Enter") {
                event.preventDefault()
                focusPronunciation()
            }
        },
        onPronunciationKeyPress: ({focusTranslation}) => event => {
            if(event.key === "Enter") {
                event.preventDefault()
                focusTranslation()
            }
        },
        onTranslationKeyPress: ({onSubmit}) => event => {
            if(event.key === "Enter") {
                event.preventDefault()
                onSubmit()
            }
        }
    }),
    withErrorBox("onSubmit", "mutationData")
)(EditCardForm)
