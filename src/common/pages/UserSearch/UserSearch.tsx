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

import {TextField, Theme} from "@material-ui/core"
import {createStyles, makeStyles} from "@material-ui/styles"
import {RouteComponentProps} from "@reach/router"
import Helmet from "react-helmet"
import {useTranslation} from "react-i18next"
import {oc} from "ts-optchain"
import {User, useUsersQuery} from "../../../generated/graphql"
import ApolloErrorBox from "../../components/apollo/ApolloErrorBox"
import {TimedCircularProgress} from "../../components/apollo/TimedCircularProgress"
import React from "react"
import {useValidatedFormState} from "../../hooks"
import {longerThan, notEmpty, shorterThan} from "../../util/validationUtils"
import UserSummary from "../UserProfile/UserSummary"

const useStyles = makeStyles((theme: Theme) => createStyles({
    resultList: {
        width: "100%",
        display: "flex",
        flexWrap: "wrap",
        padding: theme.spacing(1)
    },
    result: {
        width: "100%",
        maxWidth: 650,
        margin: theme.spacing(2),
        cursor: "pointer"
    },
    search: {
        padding: theme.spacing(2, 3)
    }
}))

interface RouteParams {
    query: string
}

const validators = {
    query: [
        {fun: notEmpty, message: "Search can't be empty"},
        {fun: shorterThan(33), message: "Search can't be more than 32 characters"},
        {fun: longerThan(2), message: "Search has to be at least 3 characters"}
    ]
}

export const UserSearch = ({query: paramsQuery, navigate}: RouteComponentProps<RouteParams>) => {
    const classes = useStyles()
    const {t} = useTranslation()
    const {query, valid} = useValidatedFormState<RouteParams>({query: paramsQuery || ""}, validators)
    const {data, error, loading} = useUsersQuery({skip: !valid, variables: {limit: 20, filter: {search: query.value}}})
    const users = oc(data).users([]) as User[]

    if(error) return <ApolloErrorBox error={error} />

    return (
        <div>
            <Helmet>
                <title>{t("Search for user {{query}} - Project Memory", {query: query.value})}</title>
            </Helmet>
            <div className={classes.search}>
                <TextField
                    label={t("Search")}
                    value={query.value}
                    onChange={query.onChange}
                    error={!!query.error}
                    helperText={query.error}
                    fullWidth
                    inputProps={{style: {textAlign: "center", fontSize: "20pt", paddingTop: 10}}}
                    autoFocus
                />
            </div>
            {loading ? <TimedCircularProgress /> : (
                <div className={classes.resultList}>
                    {users.map(user => (
                        <div key={user.id} className={classes.result} onClick={() => navigate!(`/profile/${user.id}`)}>
                            <UserSummary user={user} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default UserSearch
