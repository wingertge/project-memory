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

import {Theme} from "@material-ui/core"
import {createStyles, makeStyles} from "@material-ui/styles"
import * as React from "react"
import {oc} from "ts-optchain"
import {Deck, useShallowDecksQuery, useUserLanguagesQuery} from "../../../generated/graphql"
import ApolloErrorBox from "../../components/apollo/ApolloErrorBox"
import {TimedCircularProgress} from "../../components/apollo/TimedCircularProgress"
import DeckDisplay from "../Settings/DecksOverview/DeckDisplay"
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
    const userDecks = useShallowDecksQuery({variables: {id, userId: id}})
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
