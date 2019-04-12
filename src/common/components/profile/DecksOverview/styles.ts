import {createStyles, Theme} from "@material-ui/core"
import Color from "color"
import NewDeckDark from "../../../assets/new_deck_dark.svg"
import NewDeckLight from "../../../assets/new_deck_light.svg"

export default (theme: Theme) => createStyles({
    card: {
    },
    cardContent: {
        marginBottom: theme.spacing.unit * -1
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
/*        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        paddingLeft: theme.spacing.unit * 0.5,
        paddingRight: theme.spacing.unit * 0.5,
        "& > *": {
            marginLeft: theme.spacing.unit * 1.5,
            marginRight: theme.spacing.unit * 1.5
        }*/
/*        flexWrap: "nowrap",
        transform: "translateZ(0)"*/
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
