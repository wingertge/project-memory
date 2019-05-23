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

import {oc} from "ts-optchain"
import {Deck, useChangeSubscriptionStatusMutation, useShallowDecksQuery} from "../../generated/graphql"
import {useID} from "./index"

export const useSubscriptionToggle = (id?: string) => {
    id = id || useID()
    const userId = useID()

    const userDecks = useShallowDecksQuery({variables: {id, userId}})
    const subscribedDecks = oc(userDecks.data).user.subscribedDecks([]) as Deck[]

    const [updateSubscriptionStatusMutate] = useChangeSubscriptionStatusMutation()
    return (deck: Deck) => {
        const isSubscribed = subscribedDecks.some(d => d.id === deck.id)
        return updateSubscriptionStatusMutate({
            variables: {
                userId: id as string,
                deckId: deck.id,
                value: !isSubscribed
            },
            optimisticResponse: {
                __typename: "Mutation",
                changeSubscriptionStatus: {
                    __typename: "User",
                    id: id as string,
                    subscribedDecks: isSubscribed ? subscribedDecks.filter(d => d.id !== deck.id) : [...subscribedDecks, deck]
                }
            },
            refetchQueries: ["ReviewsCount", "LessonsCount", "Reviews"]
        })
    }
}
