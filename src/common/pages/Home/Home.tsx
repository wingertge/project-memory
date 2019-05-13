import {createStyles, Tab, Tabs} from "@material-ui/core"
import {makeStyles} from "@material-ui/styles"
import React, {useState} from "react"
import {useTranslation} from "react-i18next"
import {Redirect} from "react-router"
import {TimedCircularProgress} from "../../components/common/TimedCircularProgress"
import {useUser} from "../../hooks"
import {Theme} from "../../theme"
import AggregatedFeed from "./AggregatedFeed"
import Dashboard from "./Dashboard"

interface PropTypes {
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
