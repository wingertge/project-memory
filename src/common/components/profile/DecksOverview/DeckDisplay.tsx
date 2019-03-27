import {Grid, IconButton, Typography, withStyles, WithStyles} from "@material-ui/core"
import {Edit, Favorite} from "@material-ui/icons"
import * as React from "react"
import {RouteComponentProps, withRouter} from "react-router"
import {compose, pure, withHandlers} from "recompose"
import styles from "./styles"

interface PropTypes {
    cards: number
    id: string
    owned: boolean
}

interface HandlerTypes {
    onActionClick: () => void
}

type Props = PropTypes & HandlerTypes & WithStyles<typeof styles> & RouteComponentProps<{}>

const DeckDisplay = ({classes, cards, owned, onActionClick}: Props) => (
    <Grid container direction="column" className={classes.deck}>
        <Grid item className={classes.deckActions}>
            <div className={classes.spacer} />
            <IconButton className={classes.deckActionButton} onClick={onActionClick}>
                {owned ? <Edit /> : <Favorite />}
            </IconButton>
        </Grid>
        <Grid item xs>
            <Grid container direction="column" alignItems="center" justify="center" style={{height: "100%"}}>
                <Grid item>
                    <Typography variant="h4" className={classes.cardNumber}>{cards + ""}</Typography>
                </Grid>
            </Grid>
        </Grid>
    </Grid>
)

export default compose<Props, PropTypes>(
    pure,
    withStyles(styles),
    withRouter,
    withHandlers<Props, HandlerTypes>({
        onActionClick: ({history, id, owned}) => () => {
            if(owned)
                history.push(`/deck/${id}`)
        }
    })
)(DeckDisplay)
