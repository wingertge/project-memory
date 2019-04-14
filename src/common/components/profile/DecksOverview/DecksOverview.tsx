import {Button, Card, CardContent, CircularProgress, List, ListItem, Theme} from "@material-ui/core"
import {createStyles, makeStyles} from "@material-ui/styles"
import * as React from "react"
import {oc} from "ts-optchain"
import {Deck, useShallowDecksQuery} from "../../../../generated/graphql"
import NewDeckDark from "../../../assets/new_deck_dark.svg"
import NewDeckLight from "../../../assets/new_deck_light.svg"
import {useDialog, useID} from "../../../hooks"
import ApolloErrorBox from "../../common/ApolloErrorBox"
import Heading from "../../common/Heading"
import CreateDeckForm from "./CreateDeckForm"
import DeckDisplay from "./DeckDisplay"
import Color from "color"

const useStyles = makeStyles((theme: Theme) => createStyles({
        card: {
        },
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
            }
        },
        deckList: {
            display: "flex",
            flexDirection: "row",
            padding: 0,
            maxWidth: "100%",
            overflow: "auto"
        },
        deckListItem: {
            width: "inherit"
        }
    })
)

export const DecksOverview = () => {
    const classes = useStyles()
    const id = useID()!
    const {data, error, loading} = useShallowDecksQuery({
        variables: {id}
    })
    const ownedDecks = oc(data).user.ownedDecks([]) as Deck[]
    const subscribedDecks = oc(data).user.subscribedDecks([]) as Deck[]
    if(error) return <ApolloErrorBox error={error} />
    if(loading) return <CircularProgress />

    const {Dialog, openDialog} = useDialog(CreateDeckForm)

    return (
        <>
            <Dialog />
            <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                    <Heading>Decks</Heading>
                    <List className={classes.deckList}>
                        {ownedDecks.map(deck => (
                            <ListItem key={deck!.id} className={classes.deckListItem}>
                                <DeckDisplay
                                    deck={deck}
                                    owned={true}
                                    subscribed={false}/>
                            </ListItem>
                        ))}
                        {subscribedDecks.map(deck => (
                            <ListItem key={deck!.id} className={classes.deckListItem}>
                                <DeckDisplay id={deck!.id} name={deck!.name} cards={deck!.cardCount!} rating={deck!.rating}
                                             owned={false} subscribed={true} liked={deck!.isLikedBy}
                                             language={deck!.language}/>
                            </ListItem>
                        ))}
                        <ListItem key="new_deck">
                            <Button onClick={() => openDialog()} className={classes.newDeck}>{""}</Button>
                        </ListItem>
                    </List>
                </CardContent>
            </Card>
        </>
    )
}

export default DecksOverview
