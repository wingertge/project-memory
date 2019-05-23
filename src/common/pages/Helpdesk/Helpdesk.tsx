import {makeStyles} from "@material-ui/styles"
import {RouteComponentProps} from "@reach/router"
import {useEffect, useState} from "react"
import * as React from "react"
import {Theme} from "../../theme"
import HelpdeskArticle from "./HelpdeskArticle"
import HelpdeskNav from "./HelpdeskNav"

interface Params {
    slug: string
}

const useStyles = makeStyles((theme: Theme) => ({
    content: {
        paddingTop: theme.spacing(2)
    }
}))

export const Helpdesk = ({slug = "index"}: RouteComponentProps<Params>) => {
    const classes = useStyles()
    const [drawerOpen, setDrawerOpen] = useState(false)

    useEffect(() => setDrawerOpen(false), [slug])

    return (
        <div className={classes.content}>
            <HelpdeskNav drawerOpen={drawerOpen} />
            <HelpdeskArticle slug={slug} drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
        </div>
    )
}

export default Helpdesk
