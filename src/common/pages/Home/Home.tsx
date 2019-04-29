import {Button, Card, IconButton, makeStyles, Theme, Tooltip, Typography} from "@material-ui/core"
import {MoreHoriz} from "@material-ui/icons"
import React from "react"
import {useTranslation} from "react-i18next"
import {Redirect} from "react-router"
import {oc} from "ts-optchain"
import useRouter from "use-react-router/use-react-router"
import {useLessonsCountQuery} from "../../../generated/graphql"
import ApolloErrorBox from "../../components/common/ApolloErrorBox"
import {TimedCircularProgress} from "../../components/common/TimedCircularProgress"
import {useUser} from "../../hooks"
import PopularDecks from "../Intro/PopularDecks"
import StageCounts from "./StageCounts"
import UpcomingReviews from "./UpcomingReviews"

const useStyles = makeStyles((theme: Theme) => ({
    lessonsBox: {
        margin: theme.spacing(2)
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

const Home = () => {
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

    if(error) return <ApolloErrorBox error={error} />
    if(loading) return <TimedCircularProgress />

    return (
        <div>
            {(user && (!user.introStep || user.introStep !== -1)) && (
                <Redirect to="/intro"/>
            )}
            {lessonsCount > 0 && (
                <div className={classes.lessonsBox}>
                    <Typography variant="h6" gutterBottom>
                        {t("You have {{lessonsCount}} unreviewed lessons", {lessonsCount})}
                    </Typography>
                    <Button onClick={openLessons}>{t("Review now")}</Button>
                </div>
            )}
            {user && <UpcomingReviews/>}
            {user && <StageCounts/>}
            {user && (
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
                            <PopularDecks exclusive />
                        </div>
                    </Card>
                </div>
            )}
        </div>
    )
}

export default Home
