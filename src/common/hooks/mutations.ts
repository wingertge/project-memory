import {oc} from "ts-optchain"
import {Deck, useChangeSubscriptionStatusMutation, useShallowDecksQuery} from "../../generated/graphql"
import {isSubscribed} from "../selectors"
import {useID} from "./index"

export const useSubscriptionToggle = (id?: string) => {
    id = id || useID()

    const userDecks = useShallowDecksQuery({variables: {id}})
    const subscribedDecks = oc(userDecks.data).user.subscribedDecks([]) as Deck[]

    const updateSubscriptionStatusMutate = useChangeSubscriptionStatusMutation()
    return (deck: Deck) => updateSubscriptionStatusMutate({
        variables: {
            userId: id as string,
            deckId: deck.id,
            value: !isSubscribed({decks: subscribedDecks, id: deck.id})
        },
        optimisticResponse: {
            __typename: "Mutation",
            changeSubscriptionStatus: {
                __typename: "User",
                id: id as string,
                subscribedDecks: isSubscribed({
                    decks: subscribedDecks,
                    id: deck.id
                }) ? subscribedDecks.filter(d => d.id !== deck.id) : [...subscribedDecks, deck]
            }
        },
        refetchQueries: ["ReviewsCount", "LessonsCount", "Reviews"]
    })
}
