import {Theme} from "@material-ui/core"
import {makeStyles} from "@material-ui/styles"
import * as React from "react"
import Feed from "./Feed"
import UserSummary from "./UserSummary"

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(2),
        display: "flex",
        flexWrap: "wrap" as "wrap"
    }
}))

export const UserProfile = () => {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <div>
                <UserSummary />
            </div>
            <Feed isOwn userId="" />
        </div>
    )
}

export default UserProfile
