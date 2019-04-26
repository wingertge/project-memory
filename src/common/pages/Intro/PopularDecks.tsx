import {Theme} from "@material-ui/core"
import {createStyles, makeStyles} from "@material-ui/styles"
import * as React from "react"
import {oc} from "ts-optchain"
import {
    Deck,
    Language,
    useUserLanguagesQuery,
    useGlobalDecksQuery,
    useShallowDecksQuery,
    useUpdateProfileMutation,
    useChangeSubscriptionStatusMutation
} from "../../../generated/graphql"
import ApolloErrorBox from "../../components/common/ApolloErrorBox"
import {TimedCircularProgress} from "../../components/common/TimedCircularProgress"
import DeckDisplay from "../../components/profile/DecksOverview/DeckDisplay"
import {useID} from "../../hooks"
import {isSubscribed} from "../../selectors"

interface PropTypes {
    exclusive?: boolean
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    deckContainer: {
        display: "flex",
        flexWrap: "wrap",
        overflowY: "auto",
        padding: theme.spacing(0.5, 2, 0.5, 0.5),
        width: "fit-content"
    }
}))

export const PopularDecks = ({exclusive}: PropTypes) => {
    const classes = useStyles()
    const id = useID()
    const userLangs = useUserLanguagesQuery({variables: {userId: id}})
    const languages = oc(userLangs.data).user.languages([]) as Language[]
    const nativeLanguage = oc(userLangs.data).user.nativeLanguage() as Language
    const userDecks = useShallowDecksQuery({variables: {id}})
    const ownedDecks = oc(userDecks.data).user.ownedDecks([]) as Deck[]
    const subscribedDecks = oc(userDecks.data).user.subscribedDecks([]) as Deck[]
    const globalDecks = useGlobalDecksQuery({
        variables: {
            filter: {
                sortBy: "rating",
                sortDirection: "desc",
                limit: 20 + (exclusive ? ownedDecks.length + subscribedDecks.length : 0),
                languages: languages.map(language => language.id),
                nativeLanguage: oc(nativeLanguage).id()
            },
            userId: id
        }
    })
    let decks = oc(globalDecks.data).decks([]) as Deck[]
    if(exclusive) {
        decks = decks.filter(deck => !ownedDecks.some(ownedDeck => ownedDeck.id === deck.id) && !subscribedDecks.some(subscribedDeck => subscribedDeck.id === deck.id))
        decks = decks.slice(0, Math.min(decks.length, 20))
    }

    const updateProfile = useUpdateProfileMutation({variables: {id, profile: {introStep: 3}}})
    const updateSubscriptionStatusMutate = useChangeSubscriptionStatusMutation()
    const updateSubscriptionStatus = (deck: Deck) => updateSubscriptionStatusMutate({
        variables: {
            userId: id,
            deckId: deck.id,
            value: !isSubscribed({decks: subscribedDecks, id: deck.id})
        },
        optimisticResponse: {
            __typename: "Mutation",
            changeSubscriptionStatus: {
                __typename: "User",
                id,
                subscribedDecks: isSubscribed({decks: subscribedDecks, id: deck.id}) ? subscribedDecks.filter(d => d.id !== deck.id) : [...subscribedDecks, deck]
            }
        }
    }).then(() => {if(!exclusive) updateProfile()})

    if(userLangs.error || globalDecks.error || userDecks.error) return <ApolloErrorBox error={userLangs.error || globalDecks.error || userDecks.error!} />
    if(userLangs.loading || globalDecks.loading || userDecks.loading) return <TimedCircularProgress />

    return (
        <div className={classes.deckContainer}>
            {decks.map(deck => (
                <DeckDisplay
                    key={deck.id}
                    deck={deck}
                    onFavoriteClicked={() => updateSubscriptionStatus(deck)}
                    owned={ownedDecks.some(otherDeck => otherDeck.id === deck.id)}
                    subscribed={subscribedDecks.some(otherDeck => otherDeck.id === deck.id)}
                />
            ))}
        </div>
    )
}

export default PopularDecks
