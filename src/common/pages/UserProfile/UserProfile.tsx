import {Grid, Theme} from "@material-ui/core"
import {makeStyles} from "@material-ui/styles"
import * as React from "react"
import useRouter from "use-react-router/use-react-router"
import {TimedCircularProgress} from "../../components/common/TimedCircularProgress"
import {useID, useUser} from "../../hooks"
import Badges from "./Badges"
import Feed from "./Feed"
import UserDecks from "./UserDecks"
import UserLanguages from "./UserLanguages"
import UserSummary from "./UserSummary"

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: "100%",
        margin: 0,
        marginTop: theme.spacing(-2)
    },
    summaryContainer: {
        width: "100%"
    }
}))

export const UserProfile = () => {
    const classes = useStyles()
    let {match: {params: {id}}} = useRouter<{id: string}>()
    const userId = useID()
    const user = useUser(userId)
    const isOwn = !id || id === userId
    id = id || userId

    if(!user) return <TimedCircularProgress />

    return (
        <Grid container spacing={4} className={classes.root} justify="flex-start">
            <Grid item xs={12} lg={6}>
                <div className={classes.summaryContainer}>
                    <UserSummary user={user} />
                    <UserLanguages userId={id}/>
                    <Badges userId={id} />
                </div>
            </Grid>
            <Grid item xs={12} lg={6}>
                <UserDecks userId={id} />
            </Grid>
            <Grid item xs={12} style={{maxWidth: 1000, margin: "0 auto"}}>
                <Feed isOwn={isOwn} userId={id} />
            </Grid>
        </Grid>
    )
}

export default UserProfile
