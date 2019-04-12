import {
    Avatar,
    createStyles,
    Grid,
    IconButton,
    Theme,
    Tooltip,
    Typography,
    withStyles,
    WithStyles
} from "@material-ui/core"
import {Edit, Favorite, FavoriteBorder, ThumbUp, ThumbUpOutlined} from "@material-ui/icons"
import * as React from "react"
import {WithTranslation, withTranslation} from "react-i18next"
import {RouteComponentProps, withRouter} from "react-router"
import {compose, pure} from "recompose"
import {oc} from "ts-optchain"
import {
    ChangeLikeStatusDocument,
    ChangeLikeStatusMutation, ChangeLikeStatusMutationVariables,
    ChangeSubscriptionStatusDocument,
    ChangeSubscriptionStatusMutation,
    ChangeSubscriptionStatusMutationVariables, Deck, Language, withShallowDecks
} from "../../../../generated/graphql"
import {withHandlers, withID, withMutation} from "../../../enhancers"
import DeckImg from "../../../assets/deck.png"

interface PropTypes {
    cards: number
    id: string
    rating: number,
    owned: boolean
    subscribed: boolean
    liked: boolean
    name: string
    language: Language
    onEditClicked?: () => void
    onFavoriteClicked?: () => void
    onLikeClicked?: () => void
}

interface GQLTypes {
    userId: string
    subscribedDecks: Deck[]
}

interface HandlerTypes {
    toggleSubscription: () => void
    toggleLike: () => void
}

type Props = PropTypes & WithStyles<typeof styles> & RouteComponentProps<{}> & GQLTypes & HandlerTypes & WithTranslation

const styles = (theme: Theme) => createStyles({
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
        paddingRight: theme.spacing.unit * 3,
        paddingTop: theme.spacing.unit * 3,
        paddingLeft: theme.spacing.unit * 1.5,
        paddingBottom: theme.spacing.unit * 2,
        margin: theme.spacing.unit * 0.5
    },
    deckActions: {
        display: "flex"
    },
    deckActionButton: {
        width: "inherit",
        height: "inherit",
        padding: 4
    },
    cardNumber: {
/*        marginLeft: -12,
        marginTop: -32*/
    },
    deckName: {
        marginLeft: -12
    },
    ratingNumber: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingTop: theme.spacing.unit * 0.5
    },
    languageIcon: {
        width: 24,
        height: 24
    }
})

const DeckDisplay = ({classes, t, cards, rating, owned, subscribed, liked, name, onEditClicked, onFavoriteClicked, onLikeClicked, toggleLike, toggleSubscription, language}: Props) => (
    <Tooltip title={`${name} (${t(language.name)})`}>
        <Grid container direction="column" className={classes.deck}>
            <Grid item className={classes.deckActions}>
                <Avatar src={`/static/media/flags/${language.languageCode}.png`} className={classes.languageIcon} />
                <div className={classes.spacer}/>
                <IconButton className={classes.deckActionButton} onClick={owned ? onEditClicked! : onFavoriteClicked || toggleSubscription}>
                    {owned && <Edit/>}
                    {!owned && (subscribed ? <Favorite/> : <FavoriteBorder/>)}
                </IconButton>
            </Grid>
            <Grid item xs>
                <Grid container direction="column" alignItems="center" justify="center" style={{height: "100%"}}>
                    <Grid item>
                        <Typography variant="h4" className={classes.cardNumber}>{cards + ""}</Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item className={classes.deckActions}>
                <div className={classes.spacer}/>
                <div className={classes.ratingNumber}>
                    <Typography variant="body1">{rating}</Typography>
                </div>
                <IconButton className={classes.deckActionButton} onClick={onLikeClicked || toggleLike}>
                    {liked ? <ThumbUp/> : <ThumbUpOutlined/>}
                </IconButton>
            </Grid>
        </Grid>
    </Tooltip>
)

export default compose<Props, PropTypes>(
    pure,
    withStyles(styles),
    withTranslation(),
    withRouter,
    withID<Props>("userId"),
    withShallowDecks<Props, Partial<GQLTypes>>({
        options: ({userId}) => ({
            variables: {
                id: userId
            }
        }),
        props: ({data}) => ({
            data,
            subscribedDecks: oc(data).user.subscribedDecks([]) as Deck[]
        })
    }),
    withMutation<Props, ChangeSubscriptionStatusMutation, ChangeSubscriptionStatusMutationVariables>(ChangeSubscriptionStatusDocument, ({id, userId, subscribed}) => ({
        deckId: id,
        userId,
        value: !subscribed
    }), undefined, undefined, {
        submitName: "toggleSubscription",
        optimisticResponse: ({subscribedDecks, id, subscribed, userId}) => ({
            changeSubscriptionStatus: {
                __typename: "User",
                id: userId,
                subscribedDecks: subscribed ? subscribedDecks.filter(deck => deck.id !== id) : [...subscribedDecks, {id, __typename: "Deck"}] as Deck[]
            }
        })
    }),
    withMutation<Props, ChangeLikeStatusMutation, ChangeLikeStatusMutationVariables>(ChangeLikeStatusDocument, ({id, userId, liked}) => ({
        userId,
        deckId: id,
        value: liked ? undefined : true
    }), undefined, undefined, {
        submitName: "toggleLike",
        optimisticResponse: ({id, liked, rating}) => ({
            changeLikeStatus: {
                __typename: "Deck",
                id,
                rating: liked ? rating - 1 : rating + 1,
                isLikedBy: !liked
            }
        })
    }),
    withHandlers<Props>({
        onEditClicked: ({id, history, onEditClicked}) => () => onEditClicked ? onEditClicked() : history.push(`/deck/${id}`)
    }),
)(DeckDisplay)
