import {Button, Card, IconButton, makeStyles, Theme, Tooltip, Typography} from "@material-ui/core"
import {MoreHoriz} from "@material-ui/icons"
import React from "react"
import Helmet from "react-helmet"
import {useTranslation} from "react-i18next"
import {oc} from "ts-optchain"
import useRouter from "use-react-router"
import {
    Deck,
    Language,
    useGlobalDecksQuery,
    useLessonsCountQuery,
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
    const {history} = useRouter()
    const user = useUser()
    const {data, loading, error} = useLessonsCountQuery({
        skip: !user,
        variables: {
            userId: oc(user).id()!
        }
    })

    const lessonsCount = oc(data).user.lessonsCount(0)
    const openLessons = () => history.push("/lessons")

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
            filter: {
                sortBy: "rating",
                sortDirection: "desc",
                limit: 20,
                languages: languages.map(lang => lang.id),
                nativeLanguage: oc(nativeLanguage).id(),
                excludeOwnedBy: [oc(user).id("")],
                excludeSubscribedBy: [oc(user).id("")]
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
                            <IconButton onClick={() => history.push("/decks")} className={classes.iconButton}>
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
