import {Button, Card, CardContent, List, ListItem} from "@material-ui/core"
import * as React from "react"
import Heading from "../../common/Heading"
import DeckDisplay from "./DeckDisplay"
import {Props} from "./types"

export const DecksOverviewRaw = ({classes, ownedDecks, subscribedDecks, openDialog}: Props) => (
    <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
            <Heading>Decks</Heading>
                <List className={classes.deckList}>
                    {ownedDecks.map(deck => (
                        <ListItem key={deck!.id} className={classes.deckListItem}>
                            <DeckDisplay
                                id={deck!.id}
                                name={deck!.name}
                                cards={deck!.cardCount!}
                                rating={deck!.rating}
                                owned={true}
                                subscribed={false}
                                liked={deck!.isLikedBy}
                                language={deck!.language} />
                        </ListItem>
                    ))}
                    {subscribedDecks.map(deck => (
                        <ListItem key={deck!.id} className={classes.deckListItem}>
                            <DeckDisplay id={deck!.id} name={deck!.name} cards={deck!.cardCount!} rating={deck!.rating} owned={false} subscribed={true} liked={deck!.isLikedBy} language={deck!.language} />
                        </ListItem>
                    ))}
                    <ListItem key="new_deck">
                        <Button onClick={() => openDialog()} className={classes.newDeck}>{""}</Button>
                    </ListItem>
                </List>
        </CardContent>
    </Card>
)
