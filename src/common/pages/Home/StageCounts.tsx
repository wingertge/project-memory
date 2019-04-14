import {Card, CardMedia, Theme} from "@material-ui/core"
import {createStyles, withStyles, WithStyles} from "@material-ui/styles"
import React from "react"
import {compose, pure} from "recompose"
import StageCountDisplay from "./StageCountDisplay"

type Props = WithStyles<typeof styles>

const styles = (theme: Theme) => createStyles({
    container: {
        display: "flex"
    },
    card: {
        width: `calc(100% - ${theme.spacing(4)}px)`,
        maxWidth: 1000
    },
    root: {
        display: "flex",
        justifyContent: "center",
        padding: theme.spacing(2, 0)
    }
})

export const StageCountsRaw = ({classes}: Props) => (
    <div className={classes.root}>
        <Card className={classes.card}>
            <CardMedia>
                <div className={classes.container}>
                    <StageCountDisplay stage="Egg" />
                    <StageCountDisplay stage="Hatchling" />
                    <StageCountDisplay stage="Chick" />
                    <StageCountDisplay stage="Chicken" />
                    <StageCountDisplay stage="Mother Hen" />
                </div>
            </CardMedia>
        </Card>
    </div>
)

export default compose<Props, {}>(
    pure,
    withStyles(styles)
)(StageCountsRaw)
