import {Card, IconButton, Theme, Tooltip, Typography} from "@material-ui/core"
import {MoreHoriz} from "@material-ui/icons"
import {createStyles, makeStyles} from "@material-ui/styles"
import * as React from "react"
import {useTranslation} from "react-i18next"
import {oc} from "ts-optchain"
import useRouter from "use-react-router/use-react-router"
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
    const {history} = useRouter()
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
                    <IconButton onClick={() => history.push("/decks")} className={classes.iconButton}>
                        <MoreHoriz />
                    </IconButton>
                </Tooltip>
            </div>
            <PopularDecks decks={decks} />
        </Card>
    )
}

export default UserDecks
