import {WithStyles} from "@material-ui/core"
import Maybe from "graphql/tsutils/Maybe"
import {Deck} from "../../../../generated/graphql"
import styles from "./styles"

export interface GraphQLTypes {
    id: string
    ownedDecks: Array<Maybe<Pick<Deck, "cardCount" | "id">>>
    subscribedDecks: Array<Maybe<Pick<Deck, "cardCount" | "id">>>
}

export type Props = WithStyles<typeof styles> & GraphQLTypes
