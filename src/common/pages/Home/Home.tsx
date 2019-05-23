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

import {createStyles, Tab, Tabs} from "@material-ui/core"
import {makeStyles} from "@material-ui/styles"
import {Redirect, RouteComponentProps} from "@reach/router"
import React, {useState} from "react"
import {useTranslation} from "react-i18next"
import {TimedCircularProgress} from "../../components/apollo/TimedCircularProgress"
import {useUser} from "../../hooks"
import {Theme} from "../../theme"
import AggregatedFeed from "./AggregatedFeed"
import Dashboard from "./Dashboard"

interface PropTypes extends RouteComponentProps {
    initialTab?: number
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    content: {
        padding: theme.spacing(2),
        [theme.breakpoints.up("md")]: {
            padding: theme.spacing(2, 6)
        }
    },
    tabs: {
        backgroundColor: theme.palette.background.paper
    }
}))

const Home = ({initialTab = 0}: PropTypes) => {
    const classes = useStyles()
    const {t} = useTranslation()
    const user = useUser()
    const [tabIndex, setTabIndex] = useState(initialTab)

    if(!user) return <TimedCircularProgress />
    if(user.introStep !== -1) return <Redirect to="/intro" />

    return (
        <div>
            <Tabs value={tabIndex} onChange={(_, newIndex) => setTabIndex(newIndex)} indicatorColor="primary" className={classes.tabs}>
                <Tab label={t("Dashboard")} />
                <Tab label={t("Feed")} />
            </Tabs>
            <div className={classes.content}>
                {tabIndex === 0 && <Dashboard />}
                {tabIndex === 1 && <AggregatedFeed />}
            </div>
        </div>
    )
}

export default Home
