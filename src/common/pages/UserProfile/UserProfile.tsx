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
