import {Button, Card, CardContent, Theme, Typography} from "@material-ui/core"
import {createStyles, makeStyles} from "@material-ui/styles"
import * as React from "react"
import Helmet from "react-helmet"
import {useTranslation} from "react-i18next"
import {Review, useReviewsCountQuery} from "../../../generated/graphql"
import Checkmark from "../../assets/checkmark.png"
import Error from "../../assets/error.png"
import ApolloErrorBox from "../../components/common/ApolloErrorBox"
import LinkButton from "../../components/common/LinkButton"
import {TimedCircularProgress} from "../../components/common/TimedCircularProgress"
import {useID, useNow} from "../../hooks"

interface PropTypes {
    reviews: Array<{
        review: Review,
        correct: boolean
    }>
    onReviewMore?: () => void
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    icon: {
        width: 20,
        marginTop: theme.spacing(2)
    },
    card: {
        width: 110,
        height: 140,
        margin: theme.spacing(0, 0, 2, 2),
        textAlign: "center",
        padding: theme.spacing(1, 1, 1, 2)
    },
    cardList: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap"
    },
    allCards: {
        textAlign: "left",
        padding: theme.spacing(2, 2, 0, 2)
    },
    spacer: {
        flexGrow: 1
    },
    cardContent: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: 0,
        alignItems: "center",
        "&:last-child": {
            paddingBottom: 0
        }
    },
    button: {
        margin: theme.spacing(2)
    }
}))

export const ReviewsFinished = ({reviews, onReviewMore = () => {}}: PropTypes) => {
    const classes = useStyles()
    const {t} = useTranslation()
    const now = useNow()
    const userId = useID()
    const {data, loading, error} = useReviewsCountQuery({
        variables: {
            userId,
            filter: {toBeReviewedBy: now}
        }
    })

    if(loading) return <TimedCircularProgress />
    if(error) return <ApolloErrorBox error={error} />

    const reviewCount = data!.user!.reviewsCount

    return (
        <div>
            <Helmet>
                <title>{t("Reviews Done - Project Memory")}</title>
            </Helmet>
            <Typography variant="h5">{t("Great! You've finished {{num}} reviews.", {num: reviews.length})}</Typography>
            <LinkButton to="/" variant="outlined" className={classes.button}>{t("Back to Home")}</LinkButton>
            {reviewCount > 0 && <Button onClick={onReviewMore} variant="contained" color="primary" className={classes.button}>{t("Review more")}</Button>}
            <div className={classes.allCards}>
                {reviews.filter(review => review.correct).length > 0 && <Typography variant="h6" gutterBottom>{t("Correct")}</Typography>}
                <div className={classes.cardList}>
                    {reviews.filter(review => review.correct).map(review => (
                        <Card className={classes.card} key={review.review.id}>
                            <CardContent className={classes.cardContent}>
                                <Typography variant="subtitle1">{review.review.card.meaning}</Typography>
                                <div className={classes.spacer}/>
                                <img src={Checkmark} alt={t("Correct")} className={classes.icon}/>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                {reviews.filter(review => !review.correct).length > 0 &&
                <Typography variant="h6" gutterBottom>{t("Incorrect")}</Typography>}
                <div className={classes.cardList}>
                    {reviews.filter(review => !review.correct).map(review => (
                        <Card className={classes.card} key={review.review.id}>
                            <CardContent className={classes.cardContent}>
                                <Typography variant="subtitle1">{review.review.card.meaning}</Typography>
                                <div className={classes.spacer}/>
                                <img src={Error} alt={t("Wrong")} className={classes.icon}/>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ReviewsFinished
