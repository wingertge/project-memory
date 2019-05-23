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

import {Button, Card, CardContent, Theme, Typography} from "@material-ui/core"
import {createStyles, makeStyles} from "@material-ui/styles"
import * as React from "react"
import {oc} from "ts-optchain"
import {Deck, useShallowDecksQuery} from "../../../../generated/graphql"
import NewDeckDark from "../../../assets/new_deck_dark.svg"
import NewDeckLight from "../../../assets/new_deck_light.svg"
import ApolloErrorBox from "../../../components/apollo/ApolloErrorBox"
import {useDialog, useID} from "../../../hooks"
import CreateDeckForm from "./CreateDeckForm"
import DeckDisplay from "./DeckDisplay"
import Color from "color"

const useStyles = makeStyles((theme: Theme) => createStyles({
    cardContent: {
        marginBottom: theme.spacing(-1)
    },
    newDeck: {
        width: 144,
        height: 192,
        backgroundImage: `url("${theme.palette.type === "light" ? NewDeckLight : NewDeckDark}")`,
        backgroundRepeat: "round",
        backgroundColor: "transparent",
        borderRadius: "8pt",
        border: "none",
        "&:hover": {
            backgroundColor: Color(theme.palette.text.primary).alpha(0.2).string()
        },
        margin: theme.spacing(0.5, 0, 0, 0),
        [theme.breakpoints.up("sm")]: {
            marginLeft: theme.spacing(1)
        }
    },
    deckList: {
        display: "flex",
        flexDirection: "row",
        padding: 0,
        maxWidth: "100%",
        overflow: "auto",
        flexWrap: "wrap"
    },
    deckListItem: {
        width: "inherit"
    }
}))

export const DecksOverview = () => {
    const classes = useStyles()
    const id = useID()
    const {data, error, loading} = useShallowDecksQuery({
        variables: {id, userId: id}
    })
    const ownedDecks = oc(data).user.ownedDecks([]) as Deck[]
    const subscribedDecks = oc(data).user.subscribedDecks([]) as Deck[]
    const {Dialog, openDialog} = useDialog(CreateDeckForm)

    if(error) return <ApolloErrorBox error={error} />
    if(loading) return null

    return (
        <>
            <Dialog />
            <Card>
                <CardContent className={classes.cardContent}>
                    <Typography variant="h5">Decks</Typography>
                    <div className={classes.deckList}>
                        {ownedDecks.map(deck => (
                            <DeckDisplay key={deck!.id} deck={deck} owned={true} subscribed={false}/>
                        ))}
                        {subscribedDecks.map(deck => (
                            <DeckDisplay key={deck!.id} deck={deck} owned={false} subscribed={true} />
                        ))}
                        {ownedDecks.length <= 50 && <Button onClick={() => openDialog()} className={classes.newDeck}>{""}</Button>}
                    </div>
                </CardContent>
            </Card>
        </>
    )
}

export default DecksOverview
