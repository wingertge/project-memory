import Maybe from "graphql/tsutils/Maybe"
import {createSelector} from "reselect"
import {oc} from "ts-optchain"
import {Deck, Identity, User} from "../../generated/graphql"
import {DeepPartial} from "../util/DeepPartial"

type PartUser = Maybe<DeepPartial<User>>

export const isSocial = createSelector<PartUser, Array<Maybe<Identity>>, boolean>(
    (user: PartUser) => oc(user).identities([]),
    identities => !identities.some(identity => !(oc(identity).isSocial(true)))
)

type ShallowDecksUser = Maybe<{ownedDecks: Maybe<ShallowDeck[]>, subscribedDecks: Maybe<ShallowDeck[]>}>
type ShallowDeck = Maybe<Pick<Deck, "cardCount" | "id">>


const ownedDecksSelector = (user: ShallowDecksUser) => oc(user).ownedDecks() || []
const subscribedDecksSelector = (user: ShallowDecksUser) => oc(user).subscribedDecks() || []

export const joinDecks = createSelector<ShallowDecksUser, ShallowDeck[], ShallowDeck[], ShallowDeck[]>(
    ownedDecksSelector,
    subscribedDecksSelector,
    (ownedDecks, subscribedDecks) => [...ownedDecks.filter(deck => !!deck), ...subscribedDecks.filter(deck => !!deck)] as Deck[]
)

export const isSubscribed = createSelector<{decks: Deck[], id: string}, string[], string, boolean>(
    ({decks}) => decks.map(deck => deck.id),
    ({id}) => id,
    (decks, id) => decks.includes(id)
)
