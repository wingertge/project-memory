import {CircularProgress, createStyles, Theme, withStyles, WithStyles} from "@material-ui/core"
import * as React from "react"
import {compose} from "recompose"
import {oc} from "ts-optchain"
import {
    Deck,
    Language,
    withGlobalDecks,
    withUserLanguages,
    ChangeSubscriptionStatusMutation as Mutation,
    ChangeSubscriptionStatusMutationVariables as MutationVariables,
    ChangeSubscriptionStatusDocument,
    UpdateProfileMutation,
    UpdateProfileMutationVariables,
    UpdateProfileDocument,
    withShallowDecks
} from "../../../generated/graphql"
import ErrorBox from "../../components/common/ErrorBox"
import DeckDisplay from "../../components/profile/DecksOverview/DeckDisplay"
import {
    renderOnError,
    renderWhileLoading,
    WithID,
    withID,
    WithMutation,
    withMutation
} from "../../enhancers"
import {isSubscribed} from "../../selectors"

interface UserLanguagesTypes {
    languagesData: any
    languages: Language[]
    nativeLanguage: Language
}

interface UserDecksTypes {
    userDecksData: any
    subscribedDecks: Deck[]
    ownedDecks: Deck[]
}

interface DecksTypes {
    decksData: any
    decks: Deck[]
}

interface ProfileMutationTypes {
    submitProfileMutation: () => void
}

type Props = WithStyles<typeof styles> & WithID & UserLanguagesTypes & DecksTypes & WithMutation & ProfileMutationTypes & UserDecksTypes

const styles = (theme: Theme) => createStyles({
    deckContainer: {
        display: "flex",
        flexWrap: "wrap",
        overflowY: "auto",
        padding: theme.spacing.unit * 0.5,
        paddingTop: theme.spacing.unit * 2
    }
})

export const PopularDecksRaw = ({classes, submitMutation, decks, subscribedDecks, ownedDecks}: Props) => (
    <div className={classes.deckContainer}>
        {decks.map(deck => (
            <DeckDisplay
                key={deck.id}
                id={deck.id}
                name={deck.name}
                cards={deck.cardCount!}
                rating={deck.rating}
                onFavoriteClicked={() => submitMutation(deck)}
                owned={ownedDecks.some(otherDeck => otherDeck.id === deck.id)}
                liked={deck.isLikedBy}
                language={deck.language}
                subscribed={subscribedDecks.some(otherDeck => otherDeck.id === deck.id)}
            />
            ))}
    </div>
)

export default compose<Props, {}>(
    withStyles(styles),
    withID<Props>(),
    withUserLanguages<Props, UserLanguagesTypes>({
        options: ({id}) => ({
            variables: {
                userId: id
            }
        }),
        props: ({data}) => ({
            languagesData: data,
            languages: oc(data).user.languages([]) as Language[],
            nativeLanguage: oc(data).user.nativeLanguage() as Language
        })
    }),
    withGlobalDecks<Props, DecksTypes>({
        options: ({id, languages, nativeLanguage}) => ({
            variables: {
                filter: {
                    sortBy: "rating",
                    sortDirection: "desc",
                    limit: 20,
                    languages: languages.map(language => language.id),
                    nativeLanguage: nativeLanguage.id
                },
                userId: id
            }
        }),
        props: ({data}) => ({
            decksData: data,
            decks: oc(data).decks([]) as Deck[]
        })
    }),
    withShallowDecks<Props, UserDecksTypes>({
        options: ({id}) => ({
            variables: {
                id
            }
        }),
        props: ({data}) => ({
            userDecksData: data,
            subscribedDecks: oc(data).user.subscribedDecks([]) as Deck[],
            ownedDecks: oc(data).user.ownedDecks([]) as Deck[]
        })
    }),
    renderOnError(ErrorBox),
    renderOnError(ErrorBox, "decksData"),
    renderOnError(ErrorBox, "userDecksData"),
    renderWhileLoading(CircularProgress),
    renderWhileLoading(CircularProgress, "decksData"),
    renderWhileLoading(CircularProgress, "userDecksData"),
    withMutation<Props, UpdateProfileMutation, UpdateProfileMutationVariables>(UpdateProfileDocument, ({id}) => ({id, profile: {introStep: 3}}), undefined, undefined, {submitName: "submitProfileMutation"}),
    withMutation<Props, Mutation, MutationVariables>(ChangeSubscriptionStatusDocument,
        ({id, subscribedDecks}) => (deck: Deck) => ({userId: id, deckId: deck.id, value: !isSubscribed({decks: subscribedDecks, id: deck.id})}),
        ({submitProfileMutation}) => submitProfileMutation(), undefined, {
        optimisticResponse: ({id, subscribedDecks}) => (deck: Deck) => ({
            __typename: "Mutation",
            changeSubscriptionStatus: {
                __typename: "User",
                id,
                subscribedDecks: isSubscribed({decks: subscribedDecks, id: deck.id}) ? subscribedDecks.filter(d => d.id !== deck.id) : [...subscribedDecks, deck]
            }
        })
    }),
)(PopularDecksRaw)
