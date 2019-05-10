import {TextField, Theme} from "@material-ui/core"
import {createStyles, makeStyles} from "@material-ui/styles"
import {useTranslation} from "react-i18next"
import {oc} from "ts-optchain"
import useRouter from "use-react-router/use-react-router"
import {User, useUsersQuery} from "../../../generated/graphql"
import ApolloErrorBox from "../../components/common/ApolloErrorBox"
import {TimedCircularProgress} from "../../components/common/TimedCircularProgress"
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
        margin: theme.spacing(2)
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

export const UserSearch = () => {
    const classes = useStyles()
    const {t} = useTranslation()
    const {match: {params}, history} = useRouter<RouteParams>()
    const {query, valid} = useValidatedFormState<RouteParams>({query: params.query || ""}, validators)
    const {data, error, loading} = useUsersQuery({skip: !valid, variables: {filter: {limit: 20, search: query.value}}})
    const users = oc(data).users([]) as User[]

    if(error) return <ApolloErrorBox error={error} />
    if(loading) return <TimedCircularProgress />

    return (
        <div>
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
            <div className={classes.resultList}>
                {users.map(user => (
                    <div key={user.id} className={classes.result} onClick={() => history.push(`/profile/${user.id}`)}>
                        <UserSummary user={user} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default UserSearch
