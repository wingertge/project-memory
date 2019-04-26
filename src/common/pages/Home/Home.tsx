import {Button, makeStyles, Theme, Typography} from "@material-ui/core"
import React from "react"
import {useTranslation} from "react-i18next"
import {Redirect} from "react-router"
import {oc} from "ts-optchain"
import useRouter from "use-react-router/use-react-router"
import {useLessonsCountQuery} from "../../../generated/graphql"
import ApolloErrorBox from "../../components/common/ApolloErrorBox"
import Heading from "../../components/common/Heading"
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
                    <Heading>{t("Discover more decks")}</Heading>
                    <PopularDecks exclusive />
                </div>
            )}
        </div>
    )
}

export default Home
