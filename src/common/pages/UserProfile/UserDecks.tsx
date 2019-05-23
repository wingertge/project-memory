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

import {Card, IconButton, Theme, Tooltip, Typography} from "@material-ui/core"
import {MoreHoriz} from "@material-ui/icons"
import {createStyles, makeStyles} from "@material-ui/styles"
import {navigate} from "@reach/router"
import * as React from "react"
import {useTranslation} from "react-i18next"
import {oc} from "ts-optchain"
import {Deck, useShallowDecksQuery} from "../../../generated/graphql"
import ApolloErrorBox from "../../components/apollo/ApolloErrorBox"
import {TimedCircularProgress} from "../../components/apollo/TimedCircularProgress"
import {useID} from "../../hooks"
import PopularDecks from "../Intro/PopularDecks"

interface PropTypes {
    userId: string
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    deckDiscoveryHeader: {
        padding: theme.spacing(1, 1),
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    deckDiscoveryHeaderText: {
        flexShrink: 0,
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(1)
    },
    iconButton: {
        padding: theme.spacing(0.5)
    },
    root: {
        width: "100%"
    }
}))

export const UserDecks = ({userId}: PropTypes) => {
    const classes = useStyles()
    const {t} = useTranslation()
    const currentUserId = useID()
    const {data, loading, error} = useShallowDecksQuery({variables: {id: userId, userId: currentUserId}})
    let decks = oc(data).user.ownedDecks([]) as Deck[]
    if(decks.length > 20) decks = decks.slice(0, 20)

    if(error) return <ApolloErrorBox error={error} />
    if(loading) return <TimedCircularProgress />

    return (
        <Card className={classes.root}>
            <div className={classes.deckDiscoveryHeader}>
                <Typography variant="h5" className={classes.deckDiscoveryHeaderText}>{t("User's decks")}</Typography>
                <div style={{flex: "1 1 100%"}} />
                <Tooltip title={t("Show More")}>
                    <IconButton onClick={() => navigate("/decks")} className={classes.iconButton}>
                        <MoreHoriz />
                    </IconButton>
                </Tooltip>
            </div>
            <PopularDecks decks={decks} />
        </Card>
    )
}

export default UserDecks
