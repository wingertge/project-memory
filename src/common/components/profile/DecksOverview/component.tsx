import {Button, Card, CardContent, GridList, GridListTile, List, ListItem} from "@material-ui/core"
import * as React from "react"
import Heading from "../../common/Heading"
import DeckDisplay from "./DeckDisplay"
import {Props} from "./types"


export const DecksOverviewRaw = ({classes, ownedDecks, subscribedDecks}: Props) => (
    <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
            <Heading>Decks</Heading>
                <List className={classes.deckList}>
                    {ownedDecks.map(deck => (
                        <ListItem key={deck!.id} className={classes.deckListItem}>
                            <DeckDisplay id={deck!.id} cards={deck!.cardCount!} owned={true}/>
                        </ListItem>
                    ))}
                    {subscribedDecks.map(deck => (
                        <ListItem key={deck!.id} className={classes.deckListItem}>
                            <DeckDisplay id={deck!.id} cards={deck!.cardCount!} owned={false}/>
                        </ListItem>
                    ))}
                    <ListItem key="new_deck">
                        <Button className={classes.newDeck}>{""}</Button>
                    </ListItem>
                </List>
        </CardContent>
    </Card>
)
