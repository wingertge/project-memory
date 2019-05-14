import {Card, CardContent, Theme, Typography} from "@material-ui/core"
import {createStyles, makeStyles} from "@material-ui/styles"
import * as React from "react"
import {useTranslation} from "react-i18next"
import {oc} from "ts-optchain"
import {Deck, useShallowDecksQuery} from "../../../generated/graphql"
import ApolloErrorBox from "../../components/apollo/ApolloErrorBox"
import {TimedCircularProgress} from "../../components/apollo/TimedCircularProgress"
import DeckDisplay from "../Settings/DecksOverview/DeckDisplay"
import {useID} from "../../hooks"

interface PropTypes {
    userId: string
    isOwn: boolean
}

const useStyles = makeStyles((theme: Theme) => createStyles({
        cardContent: {
            marginBottom: theme.spacing(-1)
        },
        deckList: {
            display: "flex",
            flexDirection: "row" as "row",
            padding: 0,
            maxWidth: "100%",
            overflow: "auto",
            flexWrap: "nowrap"
        },
        deckListItem: {
            width: "inherit"
        }
    })
)

export const DeckList = ({userId, isOwn}: PropTypes) => {
    const classes = useStyles()
    const {t} = useTranslation()
    const {data, error, loading} = useShallowDecksQuery({
        variables: {id: userId}
    })
    const ownedDecks = oc(data).user.ownedDecks([]).sort((a, b) => b!.rating - a!.rating) as Deck[]

    const id = useID()
    const userDecks = useShallowDecksQuery({variables: {id}})
    const userSubscribedDecks = oc(userDecks.data).user.subscribedDecks([]) as Deck[]

    if(error || userDecks.error) return <ApolloErrorBox error={error || userDecks.error} />
    if(loading || userDecks.loading) return <TimedCircularProgress />

    return (
        <>
            <Card>
                <CardContent className={classes.cardContent}>
                    <Typography variant="h5">{t("Decks")}</Typography>
                    <div className={classes.deckList}>
                        {ownedDecks.map(deck => (
                            <DeckDisplay key={deck!.id} deck={deck} owned={isOwn} subscribed={userSubscribedDecks.some(a => a.id === deck.id)}/>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </>
    )
}

export default DeckList
