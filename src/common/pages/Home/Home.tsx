import {Button, makeStyles, Theme, Typography} from "@material-ui/core"
import React from "react"
import {useTranslation} from "react-i18next"
import {Redirect} from "react-router"
import {oc} from "ts-optchain"
import useRouter from "use-react-router/use-react-router"
import {useLessonsCountQuery} from "../../../generated/graphql"
import {useUser} from "../../hooks"
import StageCounts from "./StageCounts"
import UpcomingReviews from "./UpcomingReviews"

const useStyles = makeStyles((theme: Theme) => ({
    lessonsBox: {
        margin: theme.spacing(2)
    }
}))

const Home = () => {
    const classes = useStyles()
    const {t} = useTranslation()
    const {history} = useRouter()
    const user = useUser()
    const {data} = useLessonsCountQuery({
        skip: !user,
        variables: {
            userId: oc(user).id()!
        }
    })

    const lessonsCount = oc(data).user.lessonsCount(0)
    const openLessons = () => history.push("/lessons")

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
        </div>
    )
}

export default Home
