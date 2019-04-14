import {Card, CardContent, CircularProgress, Grid, Theme, Typography} from "@material-ui/core"
import {AccessTime, Alarm, CalendarToday} from "@material-ui/icons"
import {createStyles, withStyles, WithStyles} from "@material-ui/styles"
import clsx from "clsx"
import * as React from "react"
import {WithTranslation, withTranslation} from "react-i18next"
import {compose, pure} from "recompose"
import moment from "moment"
import {oc} from "ts-optchain"
import {Review, withReviews, withReviewsCount} from "../../../generated/graphql"
import ErrorBox from "../../components/common/ErrorBox"
import {renderOnError, renderWhileLoading, WithID, withID} from "../../enhancers"

interface GQLTypes {
    nextReview?: Review
    nextReviewData: any
    reviewCountNextHour: number
    reviewCountNextHourData: any
    reviewCountNextDay: number
    reviewCountNextDayData: any
}

type Props = WithTranslation & WithStyles<typeof styles> & GQLTypes & WithID

const styles = (theme: Theme) => createStyles({
    container: {
        display: "flex",
        alignItems: "center"
    },
    icon: {
        margin: theme.spacing(0, 1)
    },
    cardContent: {
        paddingTop: theme.spacing(3)
    },
    root: {
        display: "flex",
        justifyContent: "center"
    },
    card: {
        width: `calc(100% - ${theme.spacing(4)}px)`,
        maxWidth: 1000
    },
    middle: {
        justifyContent: "center"
    },
    right: {
        justifyContent: "flex-end",
        paddingRight: theme.spacing(1)
    }
})

const now = new Date()

export const UpcomingReviewsRaw = ({t, classes, nextReview, reviewCountNextHour, reviewCountNextDay}: Props) => (
    <div className={classes.root}>
        <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
                <Grid container justify="space-between">
                    <Grid item xs={4} className={classes.container}>
                        <Alarm className={classes.icon} />
                        <Typography variant="h6" display="inline">
                            {t("Next review {{time}}", {time: nextReview ? nextReview.nextReviewAt.getTime() < now.getTime() ? t("available now") : moment(nextReview.nextReviewAt).fromNow() : t("n/a")})}
                        </Typography>
                    </Grid>
                    <Grid item xs={4} className={clsx(classes.container, classes.middle)}>
                        <AccessTime className={classes.icon} />
                        <Typography variant="h6" display="inline">{t("{{num}} reviews in the next hour", {num: reviewCountNextHour})}</Typography>
                    </Grid>
                    <Grid item xs={4} className={clsx(classes.container, classes.right)}>
                        <CalendarToday className={classes.icon} />
                        <Typography variant="h6" display="inline">{t("{{num}} reviews in the next day", {num: reviewCountNextDay})}</Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    </div>
)

export default compose<Props, {}>(
    pure,
    withStyles(styles),
    withTranslation(),
    withID(),
    withReviews<Props, Partial<GQLTypes>>({
        options: ({id}) => ({
            variables: {
                userId: id,
                filter: {
                    sortBy: "reviewDate",
                    sortDirection: "asc",
                    limit: 1
                }
            }
        }),
        props: ({data}) => ({
            nextReviewData: data,
            nextReview: oc(data).user.reviewQueue([]).length > 0 ? data!.user!.reviewQueue![0] as Review : undefined
        })
    }),
    withReviewsCount<Props, Partial<GQLTypes>>({
        options: ({id}) => ({
            variables: {
                userId: id,
                filter: {
                    toBeReviewedBy: new Date(now.getTime() + 60 * 60 * 1000)
                }
            }
        }),
        props: ({data}) => ({
            reviewCountNextHourData: data,
            reviewCountNextHour: oc(data).user.reviewsCount(0)
        })
    }),
    withReviewsCount<Props, Partial<GQLTypes>>({
        options: ({id}) => ({
            variables: {
                userId: id,
                filter: {
                    toBeReviewedBy: new Date(now.getTime() + 24 * 60 * 60 * 1000)
                }
            }
        }),
        props: ({data}) => ({
            reviewCountNextDayData: data,
            reviewCountNextDay: oc(data).user.reviewsCount(0)
        })
    }),
    renderWhileLoading(CircularProgress, "nextReviewData"),
    renderWhileLoading(CircularProgress, "reviewCountNextHourData"),
    renderWhileLoading(CircularProgress, "reviewCountNextDayData"),
    renderOnError(ErrorBox, "nextReviewData"),
    renderOnError(ErrorBox, "reviewCountNextHourData"),
    renderOnError(ErrorBox, "reviewCountNextDayData")
)(UpcomingReviewsRaw)
