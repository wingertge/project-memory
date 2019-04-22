import {Theme} from "@material-ui/core"
import {makeStyles} from "@material-ui/styles"
import * as React from "react"
import useRouter from "use-react-router/use-react-router"
import {useID} from "../../hooks"
import Badges from "./Badges"
import Feed from "./Feed"
import UserSummary from "./UserSummary"

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: "flex",
        flexWrap: "wrap" as "wrap"
    },
    summaryContainer: {
        padding: theme.spacing(2),
        width: "100%",
        maxWidth: 650
    }
}))

export const UserProfile = () => {
    const classes = useStyles()
    let {match: {params: {id}}} = useRouter<{id: string}>()
    const userId = useID()
    const isOwn = !id || id === userId
    id = id || userId

    return (
        <div className={classes.root}>
            <div className={classes.summaryContainer}>
                <UserSummary userId={id} />
                <Badges userId={id} />
            </div>
            <Feed isOwn={isOwn} userId={id} />
        </div>
    )
}

export default UserProfile
