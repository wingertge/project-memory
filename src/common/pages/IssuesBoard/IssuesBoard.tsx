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

import {Breadcrumbs, TextField, Typography} from "@material-ui/core"
import {makeStyles} from "@material-ui/styles"
import {Link} from "@reach/router"
import * as React from "react"
import {useTranslation} from "react-i18next"
import LinkButton from "../../components/common/LinkButton"
import {useFormState} from "../../hooks"
import {Theme} from "../../theme"
import IssueTable from "./IssuesTable"

const useStyles = makeStyles((theme: Theme) => ({
    filterBar: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(1, 0, 2, 0)
    },
    searchField: {
        flex: "1 1 100%"
    },
    root: {
        padding: theme.spacing(2),
        [theme.breakpoints.up("md")]: {
            padding: theme.spacing(2, 6)
        },
        [theme.breakpoints.down("xs")]: {
            padding: theme.spacing(2, 1)
        }
    },
    newButton: {
        whiteSpace: "nowrap",
        marginLeft: theme.spacing(2),
        height: 45,
        marginTop: 2,
        flexShrink: 0,
        [theme.breakpoints.down("xs")]: {
            marginLeft: theme.spacing(1),
            padding: theme.spacing(0.75, 1.5)
        }
    }
}))

export const IssuesBoard = () => {
    const classes = useStyles()
    const {t} = useTranslation()
    const {search} = useFormState<{search: string}>({search: ""})

    return (
        <div className={classes.root}>
            <Breadcrumbs aria-label={t("Breadcrumb")}>
                <Link to="/help">
                    {t("Help")}
                </Link>
                <Typography color="textPrimary">
                    {t("Board")}
                </Typography>
            </Breadcrumbs>
            <div className={classes.filterBar}>
                <TextField label={t("Search")} variant="outlined" margin="dense" value={search.value} onChange={search.onChange} className={classes.searchField} />
                <LinkButton to="/help/board/new" variant="contained" color="primary" className={classes.newButton}>
                    {t("Ask a question")}
                </LinkButton>
            </div>
            <IssueTable search={search.value} />
        </div>
    )
}

export default IssuesBoard
