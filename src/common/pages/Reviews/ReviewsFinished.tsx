import {Card, CardContent, createStyles, Theme, Typography, withStyles, WithStyles} from "@material-ui/core"
import * as React from "react"
import {withTranslation, WithTranslation} from "react-i18next"
import {compose, pure} from "recompose"
import {Review} from "../../../generated/graphql"
import Checkmark from "../../assets/checkmark.png"
import Error from "../../assets/error.png"

interface PropTypes {
    reviews: Array<{
        review: Review,
        correct: boolean
    }>
}

type Props = PropTypes & WithTranslation & WithStyles<typeof styles>

const styles = (theme: Theme) => createStyles({
    icon: {
        width: 20,
        marginTop: theme.spacing.unit * 2
    },
    card: {
        width: 110,
        height: 140,
        marginRight: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2,
        textAlign: "center",
        padding: theme.spacing.unit,
        paddingBottom: theme.spacing.unit * 2
    },
    cardList: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap"
    },
    allCards: {
        textAlign: "left",
        padding: theme.spacing.unit * 2,
        paddingRight: 0
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
    }
})

export const ReviewsFinishedRaw = ({t, classes, reviews}: Props) => (
    <div>
        <Typography variant="h5">{t("Great! You've finished {{num}} reviews.", {num: reviews.length})}</Typography>
        <div className={classes.allCards}>
            {reviews.filter(review => review.correct).length > 0 && (<Typography variant="h6" gutterBottom>{t("Correct")}</Typography>)}
            <div className={classes.cardList}>
                {reviews.filter(review => review.correct).map(review => (
                    <Card className={classes.card}>
                        <CardContent className={classes.cardContent}>
                            <Typography variant="subheading">{review.review.card.meaning}</Typography>
                            <div className={classes.spacer} />
                            <img src={Checkmark} alt={t("Correct")} className={classes.icon} />
                        </CardContent>
                    </Card>
                ))}
            </div>
            {reviews.filter(review => !review.correct).length > 0 && <Typography variant="h6" gutterBottom>{t("Incorrect")}</Typography>}
            <div className={classes.cardList}>
                {reviews.filter(review => !review.correct).map(review => (
                    <Card className={classes.card}>
                        <CardContent className={classes.cardContent}>
                            <Typography variant="subheading">{review.review.card.meaning}</Typography>
                            <div className={classes.spacer} />
                            <img src={Error} alt={t("Wrong")} className={classes.icon} />
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    </div>
)

export default compose<Props, PropTypes>(
    pure,
    withStyles(styles),
    withTranslation()
)(ReviewsFinishedRaw)
