/*
The following is the license for the Project Memory Frontend, a frontend for the Project Memory web app.
Copyright (C) 2019  Genna Wingert

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

import {Card, CardContent, Grid, Hidden, Theme, Typography} from "@material-ui/core"
import {AccessTime, Alarm, CalendarToday} from "@material-ui/icons"
import {createStyles, makeStyles} from "@material-ui/styles"
import clsx from "clsx"
import * as React from "react"
import {useTranslation} from "react-i18next"
import moment from "moment"
import {oc} from "ts-optchain"
import {Review, useReviewsCountQuery, useReviewsQuery} from "../../../generated/graphql"
import ApolloErrorBox from "../../components/apollo/ApolloErrorBox"
import {useID, useNow} from "../../hooks"

const useStyles = makeStyles((theme: Theme) => createStyles({
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
}))

export const UpcomingReviews = () => {
    const classes = useStyles()
    const {t} = useTranslation()
    const id = useID()
    const now = useNow()
    const {data: nextReviewData, loading: nextReviewLoading, error: nextReviewError} = useReviewsQuery({
        variables: {
            userId: id,
            limit: 1,
            sort: {
                sortBy: "nextReviewAt",
                sortDirection: "asc"
            },
            filter: {
                box: {gt: 0}
            }
        }
    })
    const {data: reviewCountNextHourData, loading: reviewCountNextHourLoading, error: reviewCountNextHourError} = useReviewsCountQuery({
        variables: {
            userId: id,
            filter: {
                nextReviewAt: {lte: new Date(now.getTime() + 60 * 60 * 1000)},
                box: {gt: 0}
            }
        }
    })
    const {data: reviewCountNextDayData, loading: reviewCountNextDayLoading, error: reviewCountNextDayError} = useReviewsCountQuery({
        variables: {
            userId: id,
            filter: {
                nextReviewAt: {lte: new Date(now.getTime() + 24 * 60 * 60 * 1000)},
                box: {gt: 0}
            }
        }
    })

    const nextReview = oc(nextReviewData).user.reviewQueue([]).length > 0 ? nextReviewData!.user!.reviewQueue![0] as Review : undefined
    const reviewCountNextHour = oc(reviewCountNextHourData).user.reviewsCount(0)
    const reviewCountNextDay = oc(reviewCountNextDayData).user.reviewsCount(0)

    if(nextReviewError || reviewCountNextHourError || reviewCountNextDayError) return <ApolloErrorBox error={(nextReviewError || reviewCountNextHourError || reviewCountNextDayError)!} />
    if(nextReviewLoading || reviewCountNextHourLoading || reviewCountNextDayLoading) return null

    return (
        <div className={classes.root}>
            <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                    <Grid container justify="space-between">
                        <Grid item xs={4} className={classes.container}>
                            <Alarm className={classes.icon}/>
                            <Hidden smDown implementation="css">
                                <Typography variant="h6" display="inline">
                                    {t("Next review {{time}}", {time: nextReview ? new Date(nextReview.nextReviewAt).getTime() < now.getTime() ? t("available now") : moment(nextReview.nextReviewAt).fromNow() : t("n/a")})}
                                </Typography>
                            </Hidden>
                            <Hidden mdUp implementation="css">
                                <Typography variant="h6" display="inline">
                                    {nextReview ? new Date(nextReview.nextReviewAt).getTime() < now.getTime() ? t("now") : moment(nextReview.nextReviewAt).fromNow() : t("n/a")}
                                </Typography>

                            </Hidden>
                        </Grid>
                        <Grid item xs={4} className={clsx(classes.container, classes.middle)}>
                            <AccessTime className={classes.icon}/>
                            <Hidden smDown implementation="css">
                                <Typography variant="h6" display="inline">
                                    {t("{{num}} reviews in the next hour", {num: reviewCountNextHour})}
                                </Typography>
                            </Hidden>
                            <Hidden mdUp implementation="css">
                                <Typography variant="h6" display="inline">
                                    {reviewCountNextHour}
                                </Typography>
                            </Hidden>
                        </Grid>
                        <Grid item xs={4} className={clsx(classes.container, classes.right)}>
                            <CalendarToday className={classes.icon}/>
                            <Hidden smDown implementation="css">
                                <Typography variant="h6" display="inline">
                                    {t("{{num}} reviews in the next day", {num: reviewCountNextDay})}
                                </Typography>
                            </Hidden>
                            <Hidden mdUp implementation="css">
                                <Typography variant="h6" display="inline">
                                    {reviewCountNextDay}
                                </Typography>
                            </Hidden>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </div>
    )
}

export default UpcomingReviews
