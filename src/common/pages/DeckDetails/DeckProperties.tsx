import {Chip, Theme, Typography} from "@material-ui/core"
import {makeStyles} from "@material-ui/styles"
import * as React from "react"
import {useTranslation} from "react-i18next"
import useRouter from "use-react-router/use-react-router"
import {Deck} from "../../../generated/graphql"
interface PropTypes {
    deck: Deck
}

const useStyles = makeStyles((theme: Theme) => ({
    titleContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    ownerText: {
        marginLeft: theme.spacing(1.5),
        cursor: "pointer",
        textDecoration: "underline"
    },
    tags: {
        width: `calc(100% - ${theme.spacing(4)}px)`,
        maxWidth: 800,
        display: "flex",
        flexWrap: "wrap",
        overflow: "hidden"
    },
    tagsContainer: {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "column"
    }
}))

export const DeckProperties = ({deck}: PropTypes) => {
    const classes = useStyles()
    const {t} = useTranslation()
    const {history} = useRouter()
    const tags = deck.tags

    return (
        <div>
            <div className={classes.titleContainer}>
                <Typography variant="h4" gutterBottom>{deck.name}</Typography>
                <Typography variant="h6" onClick={() => history.push(`/profile/${deck.owner.id}`)} className={classes.ownerText}>
                    {t("by {{username}}", {username: deck.owner.username})}
                </Typography>
            </div>
            {tags.length > 0 && (
                <div className={classes.tagsContainer}>
                    <Typography variant="h6">{t("Tags")}</Typography>
                    <div className={classes.tags}>
                        {tags.map(tag => (
                            <Chip key={tag} label={tag} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default DeckProperties
