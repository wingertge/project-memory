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

import {Theme} from "@material-ui/core"
import {createStyles, makeStyles} from "@material-ui/styles"
import * as React from "react"
import {oc} from "ts-optchain"
import {Language, useUserLanguagesQuery} from "../../../generated/graphql"
import ApolloErrorBox from "../../components/apollo/ApolloErrorBox"
import {TimedCircularProgress} from "../../components/apollo/TimedCircularProgress"
import LanguageDisplay from "../Settings/LanguageSettings/LanguageDisplay"

interface PropTypes {
    userId: string
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    divider: {
        width: 1,
        backgroundColor: theme.palette.background.paper
    },
    root: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        borderRadius: 8,
        borderStyle: "solid",
        borderWidth: 2,
        borderColor: theme.palette.background.paper,
        marginTop: theme.spacing(2)
    },
    nativeLanguage: {
        backgroundColor: theme.palette.background.paper
    }
}))

export const UserLanguages = ({userId}: PropTypes) => {
    const classes = useStyles()
    const {data, loading, error} = useUserLanguagesQuery({variables: {userId}})
    const languages = oc(data).user.languages([]) as Language[]
    const nativeLanguage = oc(data).user.nativeLanguage() as Language

    if(error) return <ApolloErrorBox error={error} />
    if(loading) return <TimedCircularProgress />

    return (
        <div className={classes.root}>
            {nativeLanguage && (
                <div className={classes.nativeLanguage}>
                    <LanguageDisplay language={nativeLanguage} />
                </div>
            )}
            {languages.map(lang => <LanguageDisplay key={lang.id} language={lang} />)}
        </div>
    )
}

export default UserLanguages
