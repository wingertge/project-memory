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

import {
    Avatar,
    Checkbox,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead, TablePagination,
    TableRow,
    Tooltip,
    Typography
} from "@material-ui/core"
import {Message} from "@material-ui/icons"
import {makeStyles} from "@material-ui/styles"
import {navigate} from "@reach/router"
import {useState} from "react"
import * as React from "react"
import {useTranslation} from "react-i18next"
import {useIssuesCountQuery, useIssuesQuery} from "../../../generated/graphql"
import ApolloErrorBox from "../../components/apollo/ApolloErrorBox"
import {TimedCircularProgress} from "../../components/apollo/TimedCircularProgress"
import {Theme} from "../../theme"
import moment from "moment"

interface PropTypes {
    search: string
}

const useStyles = makeStyles((theme: Theme) => ({
    title: {
        fontWeight: "bold"
    },
    shrink: {
        width: 1
    },
    messageCountContent: {
        width: "fit-content",
        display: "flex",
        alignItems: "center",
        whiteSpace: "nowrap"
    },
    messageIcon: {
        marginRight: theme.spacing(1)
    },
    issueDisplay: {
        cursor: "pointer"
    },
    paginateSelect: {
        [theme.breakpoints.down("xs")]: {
            marginRight: theme.spacing(1)
        }
    },
    paginateActions: {
        [theme.breakpoints.down("xs")]: {
            marginLeft: 0
        }
    }
}))

export const IssueTable = ({search}: PropTypes) => {
    const classes = useStyles()
    const {t} = useTranslation()

    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(20)

    const {data, loading, error} = useIssuesQuery({
        variables: {
            limit: rowsPerPage,
            offset: page * rowsPerPage,
            sort: {sortDirection: "desc", sortBy: "lastActivity"},
            filter: {textSearch: search.length > 0 ? search : undefined}
        }
    })
    const issuesCountQuery = useIssuesCountQuery({variables: {filter: {textSearch: search.length > 0 ? search : undefined}}})

    if(loading || issuesCountQuery.loading) return <TimedCircularProgress />
    if(error || issuesCountQuery.error) return <ApolloErrorBox error={error || issuesCountQuery.error} />

    const issues = data!.issues
    const issuesCount = issuesCountQuery.data!.issuesCount

    return (
        <Paper>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell padding="checkbox"><Checkbox /></TableCell>
                        <TableCell>{t("Question")}</TableCell>
                        <TableCell padding="none">{t("Author")}</TableCell>
                        <TableCell align="center">{t("Sort")}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {issues.map(issue => (
                        <TableRow key={issue.id}>
                            <TableCell padding="checkbox">
                                <Checkbox />
                            </TableCell>
                            <TableCell component="th" scope="row" onClick={() => navigate(`/help/board/${issue.id}`)} className={classes.issueDisplay}>
                                <Typography className={classes.title}>{issue.title}</Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {t("last active {{time}}", {
                                        username: issue.by.username,
                                        time: moment(issue.lastActivity).fromNow()
                                    })}
                                </Typography>
                            </TableCell>
                            <TableCell padding="none" className={classes.shrink}>
                                <Tooltip title={issue.by.username}>
                                    <Avatar src={issue.by.picture} />
                                </Tooltip>
                            </TableCell>
                            <TableCell className={classes.shrink}>
                                {issue.replyCount > 0 && (
                                    <Tooltip title={t("{{messageCount}} messages", {shrink: issue.replyCount})}>
                                        <div className={classes.messageCountContent}>
                                            <Message width={20} height={20} className={classes.messageIcon} />
                                            <Typography gutterBottom>{issue.replyCount}</Typography>
                                        </div>
                                    </Tooltip>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {/*
            // @ts-ignore */}
            <TablePagination
                rowsPerPageOptions={[10, 20, 50]}
                component="div"
                count={issuesCount}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={(_, newPage) => setPage(newPage)}
                onChangeRowsPerPage={e => setRowsPerPage(parseInt(e.target.value, 10))}
                labelRowsPerPage={t("Questions per page")}
                classes={{selectRoot: classes.paginateSelect, actions: classes.paginateActions}}
            />
        </Paper>
    )
}

export default IssueTable
