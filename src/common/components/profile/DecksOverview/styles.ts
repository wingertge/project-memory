import {createStyles, Theme} from "@material-ui/core"
import Color from "color"

export default (theme: Theme) => createStyles({
    card: {
    },
    cardContent: {
        marginBottom: theme.spacing.unit * -1
    },
    spacer: {
        flex: "1 1 100%"
    },
    deck: {
        width: 150,
        height: 200,
        backgroundImage: `url("/static/media/deck.png")`,
        backgroundRepeat: "round",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
        padding: theme.spacing.unit * 3
    },
    deckActions: {
        display: "flex"
    },
    deckActionButton: {
        width: "fit-content",
        height: "fit-content",
        padding: 4
    },
    cardNumber: {
        marginLeft: -12,
        marginTop: -32
    },
    newDeck: {
        width: 144,
        height: 192,
        backgroundImage: `url("/static/media/new_deck_${theme.palette.type}.svg")`,
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
