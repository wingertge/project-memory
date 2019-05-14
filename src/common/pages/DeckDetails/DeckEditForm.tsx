import {Button, TextField, Theme, Typography} from "@material-ui/core"
import {makeStyles} from "@material-ui/styles"
import {ApolloError} from "apollo-client"
import {useState} from "react"
import * as React from "react"
import {useTranslation} from "react-i18next"
import useRouter from "use-react-router/use-react-router"
import {
    Deck, ShallowDecksDocument,
    useAddTagMutation,
    useDeleteDeckMutation,
    useRemoveTagMutation,
    useUpdateDeckMutation
} from "../../../generated/graphql"
import AutocompleteTagInput from "../../components/common/AutocompleteTagInput"
import WithErrorBox from "../../components/apollo/WithErrorBox"
import {useConfirmDialog, useDialog, useID, useToast, useValidatedFormState} from "../../hooks"
import {deckPropsValidators, Form, RouteTypes} from "./DeckDetails"
import EditCardForm from "./EditCardForm"

interface PropTypes {
    deck: Deck
    rowsPerPage: number
}

const useStyles = makeStyles((theme: Theme) => ({
    textField: {
        width: "100%",
        maxWidth: 500,
        margin: theme.spacing(0.25, 0)
    },
    form: {
        margin: theme.spacing(2),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    actions: {
        padding: theme.spacing(2, 0),
        paddingBottom: 0,
        width: "100%",
        maxWidth: 500,
        display: "flex",
        flexDirection: "row"
    },
    deleteButton: {
        backgroundColor: theme.palette.error.main,
        "&:hover": {
            backgroundColor: theme.palette.error.dark
        }
    }
}))

export const DeckEditForm = ({deck, rowsPerPage}: PropTypes) => {
    const classes = useStyles()
    const {t} = useTranslation()
    const {Dialog, openDialog} = useDialog(EditCardForm)
    const {history, match: {params: {id, page: pageString = "0", sortDirection = "asc", sortBy = "meaning"}}} = useRouter<RouteTypes>()
    const page = parseInt(pageString, 10)
    const {name} = useValidatedFormState<Form>({name: deck.name}, deckPropsValidators)
    const {Toast, openToast} = useToast("Successfully saved deck")
    const [mutationError, setMutationError] = useState<ApolloError | undefined>(undefined)
    const updateDeck = useUpdateDeckMutation({variables: {id, deckInput: {name: name.value}}})
    const save = () => updateDeck().then(({errors}) => {
        setMutationError((errors && errors.length > 0 && errors[0] as any) || undefined)
        openToast()
    })
    const tags = deck.tags
    const [tagError, setTagError] = useState<string | undefined>(undefined)
    const userId = useID()

    const addTagMutate = useAddTagMutation()
    const addTag = (chip: string) => {
        if(chip.trim().length > 40) {
            setTagError("Tag can't be longer than 40 characters")
            return
        }
        if(tags.length >= 20) {
            setTagError("Sorry, only 20 tags per deck")
            return
        }
        addTagMutate({
            variables: {deckId: id, tag: chip},
            optimisticResponse: {
                addTagToDeck: {
                    __typename: "Deck",
                    id,
                    tags: [...tags, chip]
                }
            },
            refetchQueries: ["GlobalTags"]
        })
    }

    const removeTagMutate = useRemoveTagMutation()
    const removeTag = (chip: string) => {
        setTagError(undefined)
        removeTagMutate({
            variables: {deckId: id, tag: chip},
            optimisticResponse: {
                removeTagFromDeck: {
                    __typename: "Deck",
                    id,
                    tags: tags.filter(tag => tag !== chip)
                }
            },
            refetchQueries: ["GlobalTags"]
        })
    }

    const [deleting, setDeleting] = useState(false)
    const deleteDeckMutate = useDeleteDeckMutation({variables: {id}, refetchQueries: [{query: ShallowDecksDocument, variables: {id: userId}}, "GlobalDecks", "LessonsCount", "ReviewsCount"]})
    const deleteDeck = () => {
        setDeleting(true)
        deleteDeckMutate().then(() => {
            history.push("/")
        })
    }
    const [confirmDelete, ConfirmDeleteDialog] = useConfirmDialog(
        deleteDeck,
        "Are you sure you want to delete this deck?",
        "This action is irreversible and will affect all subscribers. Be sure you know what you're doing here."
    )

    return (
        <>
            <Toast />
            <Dialog />
            <ConfirmDeleteDialog />
            <WithErrorBox prop={{error: mutationError}} retry={save}>
                <Typography variant="h5">
                    {t("Edit Deck")}
                </Typography>
                <form className={classes.form}>
                    <TextField label={t("Deck Name")} value={name.value} onChange={name.onChange} className={classes.textField}/>
                    <AutocompleteTagInput label={t("Tags")} chips={tags} fullWidth
                               onAdd={chip => addTag(chip)} onDelete={chip => removeTag(chip)} classes={{}}
                               className={classes.textField} error={!!tagError} helperText={t(tagError!)}
                    />
                    <div className={classes.actions}>
                        <Button onClick={save}>{t("Save")}</Button>
                        <Button onClick={() => openDialog({
                            deckId: id,
                            language: deck.language,
                            nativeLanguage: deck.nativeLanguage,
                            rowsPerPage,
                            page,
                            sortBy,
                            sortDirection
                        })} style={{flexShrink: 0}}>{t("Add Cards")}</Button>
                        <div style={{flex: "1 1 100%"}} />
                        <Button variant="outlined" className={classes.deleteButton} disabled={deleting} onClick={confirmDelete}>{t("Delete")}</Button>
                    </div>
                </form>
            </WithErrorBox>
        </>
    )
}
