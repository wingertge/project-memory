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

import {Button, Card, IconButton, makeStyles, Theme, Tooltip, Typography} from "@material-ui/core"
import {MoreHoriz} from "@material-ui/icons"
import {navigate} from "@reach/router"
import React from "react"
import Helmet from "react-helmet"
import {useTranslation} from "react-i18next"
import {oc} from "ts-optchain"
import {
    Deck,
    Language,
    useGlobalDecksQuery, useReviewsCountQuery,
    useUserLanguagesQuery
} from "../../../generated/graphql"
import ApolloErrorBox from "../../components/apollo/ApolloErrorBox"
import {TimedCircularProgress} from "../../components/apollo/TimedCircularProgress"
import {useUser} from "../../hooks"
import PopularDecks from "../Intro/PopularDecks"
import StageCounts from "./StageCounts"
import UpcomingReviews from "./UpcomingReviews"

const useStyles = makeStyles((theme: Theme) => ({
    lessonsBox: {
        margin: theme.spacing(2),
        marginTop: 0
    },
    deckDiscoveryBox: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    deckDiscoveryHeader: {
        padding: theme.spacing(1, 1),
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    deckDiscoveryHeaderText: {
        flexShrink: 0,
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(1)
    },
    iconButton: {
        padding: theme.spacing(0.5)
    }
}))


export const Dashboard = () => {
    const classes = useStyles()
    const {t} = useTranslation()
    const user = useUser()
    const {data, loading, error} = useReviewsCountQuery({
        skip: !user,
        variables: {
            userId: oc(user).id()!,
            filter: {
                box: {eq: 0}
            }
        }
    })

    const lessonsCount = oc(data).user.reviewsCount(0)
    const openLessons = () => navigate("/lessons")

    const userLangs = useUserLanguagesQuery({
        skip: !user,
        variables: {
            userId: oc(user).id("")
        }
    })
    const languages = oc(userLangs.data).user.languages([]) as Language[]
    const nativeLanguage = oc(userLangs.data).user.nativeLanguage() as Language

    const globalDecks = useGlobalDecksQuery({
        skip: !user,
        variables: {
            limit: 10,
            filter: {
                language: {in: languages.map(lang => lang.id)},
                nativeLanguage: {eq: oc(nativeLanguage).id()},
                owner: {ne: oc(user).id("")},
                subscribers: {ne: oc(user).id("")}
            },
            sort: {
                sortBy: "rating",
                sortDirection: "desc"
            },
            userId: oc(user).id("")
        }
    })
    const decks = oc(globalDecks.data).decks([]) as Deck[]

    if(error || globalDecks.error || userLangs.error) return <ApolloErrorBox error={error || globalDecks.error || userLangs.error} />
    if(loading || globalDecks.loading || userLangs.loading || !user) return <TimedCircularProgress />

    return (
        <div>
            <Helmet>
                <title>{t("Dashboard - Project Memory")}</title>
            </Helmet>
            {lessonsCount > 0 && (
                <div className={classes.lessonsBox}>
                    <Typography variant="h6" gutterBottom>
                        {t("You have {{lessonsCount}} unreviewed lessons", {lessonsCount})}
                    </Typography>
                    <Button onClick={openLessons}>{t("Review now")}</Button>
                </div>
            )}
            <UpcomingReviews/>
            <StageCounts/>
            <div className={classes.deckDiscoveryBox}>
                <Card>
                    <div className={classes.deckDiscoveryHeader}>
                        <Typography variant="h5" className={classes.deckDiscoveryHeaderText}>{t("Discover more decks")}</Typography>
                        <div style={{flex: "1 1 100%"}} />
                        <Tooltip title={t("Show More")}>
                            <IconButton onClick={() => navigate("/decks")} className={classes.iconButton}>
                                <MoreHoriz />
                            </IconButton>
                        </Tooltip>
                    </div>
                    <div className={classes.deckDiscoveryBox}>
                        <PopularDecks decks={decks} />
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default Dashboard
