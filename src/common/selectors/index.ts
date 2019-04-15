import {createSelector} from "reselect"
import {Deck} from "../../generated/graphql"

export const isSubscribed = createSelector<{decks: Deck[], id: string}, string[], string, boolean>(
    ({decks}) => decks.map(deck => deck.id),
    ({id}) => id,
    (decks, id) => decks.includes(id)
)
