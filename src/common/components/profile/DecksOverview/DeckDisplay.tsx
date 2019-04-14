import {
    Avatar,
    Grid,
    IconButton,
    Theme,
    Tooltip,
    Typography
} from "@material-ui/core"
import {Edit, Favorite, FavoriteBorder, ThumbUp, ThumbUpOutlined} from "@material-ui/icons"
import {createStyles, makeStyles} from "@material-ui/styles"
import * as React from "react"
import {useTranslation} from "react-i18next"
import {oc} from "ts-optchain"
import useRouter from "use-react-router/use-react-router"
import {
    Deck, useChangeLikeStatusMutation,
    useChangeSubscriptionStatusMutation,
    useShallowDecksQuery
} from "../../../../generated/graphql"
import DeckImg from "../../../assets/deck.png"
import {useID} from "../../../hooks"

interface PropTypes {
    owned: boolean
    subscribed: boolean
    deck: Deck
    onEditClicked?: () => void
    onFavoriteClicked?: () => void
    onLikeClicked?: () => void
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    spacer: {
        flex: "1 1 100%"
    },
    deck: {
        width: 150,
        height: 200,
        backgroundImage: `url("${DeckImg}")`,
        backgroundRepeat: "round",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
        padding: theme.spacing(1.5, 3, 3, 2),
        margin: theme.spacing(0.5)
    },
    deckActions: {
        display: "flex"
    },
    deckActionButton: {
        width: "inherit",
        height: "inherit",
        padding: 4
    },
    deckName: {
        marginLeft: -12
    },
    ratingNumber: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingTop: theme.spacing(0.5)
    },
    languageIcon: {
        width: 24,
        height: 24
    }
}))

export const DeckDisplay = ({deck: {id, cards, rating, isLikedBy: liked, name, language}, owned, subscribed, onEditClicked, onFavoriteClicked, onLikeClicked}: PropTypes) => {
    const classes = useStyles()
    const {t} = useTranslation()
    const {history} = useRouter()
    const userId = useID()

    const {data} = useShallowDecksQuery({
        variables: {
            id: userId
        }
    })

    const subscribedDecks = oc(data).user.subscribedDecks([]) as Deck[]
    const toggleSubscription = useChangeSubscriptionStatusMutation({
        variables: {
            deckId: id,
            userId,
            value: !subscribed
        },
        optimisticResponse: {
            changeSubscriptionStatus: {
                __typename: "User",
                id: userId,
                subscribedDecks: subscribed ? subscribedDecks.filter(deck => deck.id !== id) : [...subscribedDecks, {id, __typename: "Deck"}] as Deck[]
            }
        }
    })

    const toggleLike = useChangeLikeStatusMutation({
        variables: {
            userId,
            deckId: id,
            value: liked ? undefined : true
        },
        optimisticResponse: {
            changeLikeStatus: {
                __typename: "Deck",
                id,
                rating: liked ? rating - 1 : rating + 1,
                isLikedBy: !liked
            }
        }
    })

    onEditClicked = onEditClicked || (() => history.push(`/deck/${id}`))
    onFavoriteClicked = onFavoriteClicked || toggleSubscription
    onLikeClicked = onLikeClicked || toggleLike

    return (
        <Tooltip title={`${name} (${t(language.name)})`}>
            <Grid container direction="column" className={classes.deck}>
                <Grid item className={classes.deckActions}>
                    <Avatar src={`/static/media/flags/${language.languageCode}.png`} className={classes.languageIcon}/>
                    <div className={classes.spacer}/>
                    <IconButton className={classes.deckActionButton}
                                onClick={owned ? onEditClicked! : onFavoriteClicked}>
                        {owned && <Edit/>}
                        {!owned && (subscribed ? <Favorite/> : <FavoriteBorder/>)}
                    </IconButton>
                </Grid>
                <Grid item xs>
                    <Grid container direction="column" alignItems="center" justify="center" style={{height: "100%"}}>
                        <Grid item>
                            <Typography variant="h4">{cards + ""}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item className={classes.deckActions}>
                    <div className={classes.spacer}/>
                    <div className={classes.ratingNumber}>
                        <Typography variant="body1">{rating}</Typography>
                    </div>
                    <IconButton className={classes.deckActionButton} onClick={onLikeClicked}>
                        {liked ? <ThumbUp/> : <ThumbUpOutlined/>}
                    </IconButton>
                </Grid>
            </Grid>
        </Tooltip>
    )
}

export default DeckDisplay
