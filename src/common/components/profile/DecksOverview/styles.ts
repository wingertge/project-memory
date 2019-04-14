import {Theme} from "@material-ui/core"
import {createStyles} from "@material-ui/styles"
import Color from "color"
import NewDeckDark from "../../../assets/new_deck_dark.svg"
import NewDeckLight from "../../../assets/new_deck_light.svg"

export default (theme: Theme) => createStyles({
    card: {
    },
    cardContent: {
        marginBottom: theme.spacing(-1)
    },
    newDeck: {
        width: 144,
        height: 192,
        backgroundImage: `url("${theme.palette.type === "light" ? NewDeckLight : NewDeckDark}")`,
        backgroundRepeat: "round",
        backgroundColor: "transparent",
        borderRadius: "8pt",
        border: "none",
        "&:hover": {
            backgroundColor: Color(theme.palette.text.primary).alpha(0.2).string()
        }
    },
    deckList: {
        display: "flex",
        flexDirection: "row",
        padding: 0,
        maxWidth: "100%",
        overflow: "auto"
    },
    deckListItem: {
        width: "inherit"
    }
})
