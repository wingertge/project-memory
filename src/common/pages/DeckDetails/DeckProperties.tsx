import {Button, Chip, Theme, Typography} from "@material-ui/core"
import {makeStyles} from "@material-ui/styles"
import {navigate} from "@reach/router"
import * as React from "react"
import {useTranslation} from "react-i18next"
import {oc} from "ts-optchain"
import {Deck, useShallowDecksQuery} from "../../../generated/graphql"
import {useID, useSubscriptionToggle} from "../../hooks"

interface PropTypes {
    deck: Deck
}

const useStyles = makeStyles((theme: Theme) => ({
    titleContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    ownerText: {
        marginLeft: theme.spacing(1.5),
        cursor: "pointer",
        textDecoration: "underline"
    },
    tags: {
        width: `calc(100% - ${theme.spacing(4)}px)`,
        maxWidth: 800,
        display: "flex",
        flexWrap: "wrap",
        overflow: "hidden"
    },
    tagsContainer: {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "column"
    },
    subscribeButton: {
        margin: theme.spacing(1)
    }
}))

export const DeckProperties = ({deck}: PropTypes) => {
    const classes = useStyles()
    const {t} = useTranslation()
    const tags = deck.tags
    const userId = useID()

    const {data} = useShallowDecksQuery({
        variables: {
            id: userId,
            userId
        }
    })

    const subscribedDecks = oc(data).user.subscribedDecks([]) as Deck[]
    const subscribed = subscribedDecks.some(d => d.id === deck.id)

    const toggleSubscription = useSubscriptionToggle()

    return (
        <div>
            <div className={classes.titleContainer}>
                <Typography variant="h4" gutterBottom>{deck.name}</Typography>
                <Typography variant="h6" onClick={() => navigate(`/profile/${deck.owner.id}`)} className={classes.ownerText}>
                    {t("by {{username}}", {username: deck.owner.username})}
                </Typography>
            </div>
            <Button variant="contained" color="primary" onClick={() => toggleSubscription(deck)} className={classes.subscribeButton}>
                {subscribed ? t("Unsubscribe") : t("Subscribe")}
            </Button>
            {tags.length > 0 && (
                <div className={classes.tagsContainer}>
                    <Typography variant="h6">{t("Tags")}</Typography>
                    <div className={classes.tags}>
                        {tags.map(tag => (
                            <Chip key={tag} label={tag} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default DeckProperties
