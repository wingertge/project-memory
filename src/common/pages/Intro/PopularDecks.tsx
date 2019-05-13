import {Theme} from "@material-ui/core"
import {createStyles, makeStyles} from "@material-ui/styles"
import * as React from "react"
import {oc} from "ts-optchain"
import {Deck, useShallowDecksQuery, useUserLanguagesQuery} from "../../../generated/graphql"
import ApolloErrorBox from "../../components/common/ApolloErrorBox"
import {TimedCircularProgress} from "../../components/common/TimedCircularProgress"
import DeckDisplay from "../../components/profile/DecksOverview/DeckDisplay"
import {useID, useSubscriptionToggle} from "../../hooks"

interface PropTypes {
    decks: Deck[],
    onSave?: () => void
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

export const PopularDecks = ({decks, onSave = () => {}}: PropTypes) => {
    const classes = useStyles()
    const id = useID()
    const userLangs = useUserLanguagesQuery({variables: {userId: id}})
    const userDecks = useShallowDecksQuery({variables: {id}})
    const ownedDecks = oc(userDecks.data).user.ownedDecks([]) as Deck[]
    const subscribedDecks = oc(userDecks.data).user.subscribedDecks([]) as Deck[]

    const subscriptionToggle = useSubscriptionToggle()
    const toggleSubscription = (deck: Deck) => subscriptionToggle(deck).then(onSave)

    if(userLangs.error || userDecks.error) return <ApolloErrorBox error={userLangs.error || userDecks.error!} />
    if(userLangs.loading || userDecks.loading) return <TimedCircularProgress />

    return (
        <div className={classes.deckContainer}>
            {decks.map(deck => (
                <DeckDisplay
                    key={deck.id}
                    deck={deck}
                    onFavoriteClicked={() => toggleSubscription(deck)}
                    owned={ownedDecks.some(otherDeck => otherDeck.id === deck.id)}
                    subscribed={subscribedDecks.some(otherDeck => otherDeck.id === deck.id)}
                />
            ))}
        </div>
    )
}

export default PopularDecks
