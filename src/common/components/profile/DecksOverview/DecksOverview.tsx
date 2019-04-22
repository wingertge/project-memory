import {Button, Card, CardContent, Theme} from "@material-ui/core"
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
    })
)

export const DecksOverview = () => {
    const classes = useStyles()
    const id = useID()
    const {data, error, loading} = useShallowDecksQuery({
        variables: {id}
    })
    const ownedDecks = oc(data).user.ownedDecks([]) as Deck[]
    const subscribedDecks = oc(data).user.subscribedDecks([]) as Deck[]
    const {Dialog, openDialog} = useDialog(CreateDeckForm)

    if(error) return <ApolloErrorBox error={error} />
    if(loading) return null

    return (
        <>
            <Dialog />
            <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                    <Heading>Decks</Heading>
                    <div className={classes.deckList}>
                        {ownedDecks.map(deck => (
                            <DeckDisplay key={deck!.id} deck={deck} owned={true} subscribed={false}/>
                        ))}
                        {subscribedDecks.map(deck => (
                            <DeckDisplay deck={deck} owned={false} subscribed={true} />
                        ))}
                        <Button onClick={() => openDialog()} className={classes.newDeck}>{""}</Button>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}

export default DecksOverview
