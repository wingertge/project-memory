import {Grid} from "@material-ui/core"
import {makeStyles} from "@material-ui/styles"
import {RouteComponentProps} from "@reach/router"
import * as React from "react"
import Helmet from "react-helmet"
import {useTranslation} from "react-i18next"
import {TimedCircularProgress} from "../../components/apollo/TimedCircularProgress"
import {useID, useUser} from "../../hooks"
import Badges from "./Badges"
import UserFeed from "./UserFeed"
import UserDecks from "./UserDecks"
import UserLanguages from "./UserLanguages"
import UserSummary from "./UserSummary"

const useStyles = makeStyles({
    root: {
        width: "100%",
        margin: 0
    },
    summaryContainer: {
        width: "100%"
    }
})

export const UserProfile = ({id}: RouteComponentProps<{id: string}>) => {
    const classes = useStyles()
    const {t} = useTranslation()
    const userId = useID()
    const isOwn = !id || id === userId
    id = id || userId
    const user = useUser(id)

    if(!user) return <TimedCircularProgress />

    return (
        <Grid container spacing={4} className={classes.root} justify="flex-start">
            <Helmet>
                <title>{t("{{username}}'s Profile - Project Memory", {username: user.username})}</title>
            </Helmet>
            <Grid item xs={12} lg={6}>
                <div className={classes.summaryContainer}>
                    <UserSummary user={user} isOwn={isOwn} />
                    <UserLanguages userId={id}/>
                    <Badges userId={id} />
                </div>
            </Grid>
            <Grid item xs={12} lg={6}>
                <UserDecks userId={id} />
            </Grid>
            <Grid item xs={12} style={{maxWidth: 1000, margin: "0 auto"}}>
                <UserFeed isOwn={isOwn} userId={id} />
            </Grid>
        </Grid>
    )
}

export default UserProfile
