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
