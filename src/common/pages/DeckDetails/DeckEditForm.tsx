import {Button, TextField, Theme} from "@material-ui/core"
import {makeStyles} from "@material-ui/styles"
import {ApolloError} from "apollo-client"
import ChipInput from "material-ui-chip-input"
import {useState} from "react"
import * as React from "react"
import {useTranslation} from "react-i18next"
import useRouter from "use-react-router/use-react-router"
import {Deck, useAddTagMutation, useRemoveTagMutation, useUpdateDeckMutation} from "../../../generated/graphql"
import Heading from "../../components/common/Heading"
import WithErrorBox from "../../components/common/WithErrorBox"
import {useDialog, useToast, useValidatedFormState} from "../../hooks"
import {deckPropsValidators, Form, RouteTypes} from "./DeckDetails"
import EditCardForm from "./EditCardForm"

interface PropTypes {
    deck: Deck
    rowsPerPage: number
}

const useStyles = makeStyles((theme: Theme) => ({
    textField: {
        width: `calc(100% - ${theme.spacing(4)}px)`,
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
        padding: theme.spacing(2),
        paddingBottom: 0
    }
}))

export const DeckEditForm = ({deck, rowsPerPage}: PropTypes) => {
    const classes = useStyles()
    const {t} = useTranslation()
    const {Dialog, openDialog} = useDialog(EditCardForm)
    const {match: {params: {id, page: pageString = "0", sortDirection = "asc", sortBy = "meaning"}}} = useRouter<RouteTypes>()
    const page = parseInt(pageString, 10)
    const {name} = useValidatedFormState<Form>({name: deck.name}, deckPropsValidators)
    const {Toast, openToast} = useToast("Successfully saved profile")
    const [mutationError, setMutationError] = useState<ApolloError | undefined>(undefined)
    const updateDeck = useUpdateDeckMutation({variables: {id, deckInput: {name: name.value}}})
    const save = () => updateDeck().then(({errors}) => {
        setMutationError((errors && errors.length > 0 && errors[0] as any) || undefined)
        openToast()
    })
    const tags = deck.tags
    const [tagError, setTagError] = useState<string | undefined>(undefined)

    const addTagMutate = useAddTagMutation()
    const addTag = (chip: string) => {
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
            }
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
            }
        })
    }

    return (
        <>
            <Toast />
            <Dialog />
            <WithErrorBox prop={{error: mutationError}} retry={save}>
                <Heading>
                    {t("Edit Deck")}
                </Heading>
                <form className={classes.form}>
                    <TextField label={t("Deck Name")} value={name.value} onChange={name.onChange} className={classes.textField}/>
                    <ChipInput label={t("Tags")} value={tags}
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
                        })}>{t("Add Cards")}</Button>
                    </div>
                </form>
            </WithErrorBox>
        </>
    )
}
