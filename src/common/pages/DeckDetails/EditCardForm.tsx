import {
    Button,
    createStyles,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField, Theme, WithStyles, withStyles
} from "@material-ui/core"
import Maybe from "graphql/tsutils/Maybe"
import * as React from "react"
import {withTranslation, WithTranslation} from "react-i18next"
import {compose, pure, withHandlers, withProps, withPropsOnChange} from "recompose"
import {oc} from "ts-optchain"
import {
    Card, UpsertCardDocument,
    UpsertCardMutation,
    UpsertCardMutationVariables,
    UpsertCardProps
} from "../../../generated/graphql"
import {MutateFn, MutationProps, withErrorBox, withFormState, withMutation, WithToast, withToast} from "../../enhancers"
import {Column, SortDirection} from "./types"

export interface PropTypes {
    closeDialog: () => void
    card?: Maybe<Pick<Card, "id" | "meaning" | "pronunciation" | "translation">>
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

interface GraphQLTypes {
    submit: MutateFn<UpsertCardMutation, UpsertCardMutationVariables>
}

type Form = FormTypes & FormHandlerTypes & FormUpdaterTypes
type Props = WithTranslation & PropTypes & Form & WithStyles<typeof styles> & UpsertCardProps<{}> & HandlerTypes & MutationProps<UpsertCardMutation, UpsertCardMutationVariables> & GraphQLTypes & WithToast & SpecialTypes

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
    withMutation<Props, UpsertCardMutation, UpsertCardMutationVariables>(UpsertCardDocument, "submit", "onSaved"),
    withHandlers<Props, Partial<HandlerTypes>>({
        onSubmit: ({submit, deckId, card, meaning, pronunciation, translation, rowsPerPage, page, sortBy, sortDirection}) => () => {
            submit({
                deckID: deckId,
                card: {
                    id: oc(card).id(),
                    meaning,
                    pronunciation,
                    translation
                },
                cardFilter: {
                    limit: rowsPerPage,
                    offset: page * rowsPerPage,
                    sortBy,
                    sortDirection
                }
            })
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
