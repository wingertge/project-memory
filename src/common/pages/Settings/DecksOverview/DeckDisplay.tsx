import {
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
import useRouter from "use-react-router"
import {
    Deck, useChangeLikeStatusMutation,
    useChangeSubscriptionStatusMutation,
    useShallowDecksQuery
} from "../../../../generated/graphql"
import DeckImg from "../../../assets/deck.png"
import {useID} from "../../../hooks"
import LanguageIcon from "../../../components/common/LanguageIcon"

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
        padding: theme.spacing(3, 3, 2, 1.5),
        margin: theme.spacing(0.5, 0, 0, 0),
        [theme.breakpoints.up("sm")]: {
            marginLeft: theme.spacing(1)
        }
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
    },
    cardCountContainer: {
        height: "100%",
        cursor: "pointer"
    }
}))

export const DeckDisplay = ({deck: {id, cardCount, rating, isLikedBy: liked, name, language}, owned, subscribed, onEditClicked, onFavoriteClicked, onLikeClicked}: PropTypes) => {
    const classes = useStyles()
    const {t} = useTranslation()
    const {history} = useRouter()
    const userId = useID()

    const {data} = useShallowDecksQuery({
        variables: {
            id: userId,
            userId
        }
    })

    const subscribedDecks = oc(data).user.subscribedDecks([]) as Deck[]
    const [toggleSubscription] = useChangeSubscriptionStatusMutation({
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

    const [toggleLike] = useChangeLikeStatusMutation({
        variables: {
            userId,
            deckId: id,
            value: !liked
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
    const favoriteClicked = event => {
        event.cancelEdit = true
        onFavoriteClicked!()
    }
    const likeClicked = event => {
        event.cancelEdit = true
        onLikeClicked!()
    }
    const clickEdit = event => {
        if(event.cancelEdit) {
            event.cancelEdit = false
            return
        }
        onEditClicked!()
    }

    return (
        <Tooltip title={`${name} (${t(language.name)})`}>
            <Grid container direction="column" className={classes.deck} onClick={clickEdit}>
                <Grid item className={classes.deckActions}>
                    <LanguageIcon language={language} className={classes.languageIcon} />
                    <div className={classes.spacer}/>
                    <IconButton className={classes.deckActionButton}
                                onClick={owned ? onEditClicked! : favoriteClicked}>
                        {owned && <Edit/>}
                        {!owned && (subscribed ? <Favorite/> : <FavoriteBorder/>)}
                    </IconButton>
                </Grid>
                <Grid item xs>
                    <Grid container direction="column" alignItems="center" justify="center" className={classes.cardCountContainer}>
                        <Grid item>
                            <Typography variant="h4">{cardCount + ""}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item className={classes.deckActions}>
                    <div className={classes.spacer}/>
                    <div className={classes.ratingNumber}>
                        <Typography variant="body1">{rating}</Typography>
                    </div>
                    <IconButton className={classes.deckActionButton} onClick={likeClicked}>
                        {liked ? <ThumbUp/> : <ThumbUpOutlined/>}
                    </IconButton>
                </Grid>
            </Grid>
        </Tooltip>
    )
}

export default DeckDisplay
