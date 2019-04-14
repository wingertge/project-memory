import {Card, Theme} from "@material-ui/core"
import {createStyles, makeStyles} from "@material-ui/styles"
import React from "react"
import StageCountDisplay from "./StageCountDisplay"

const useStyles = makeStyles((theme: Theme) => createStyles({
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
}))

export const StageCounts = () => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <Card className={classes.card}>
                <div className={classes.container}>
                    <StageCountDisplay stage="Egg"/>
                    <StageCountDisplay stage="Hatchling"/>
                    <StageCountDisplay stage="Chick"/>
                    <StageCountDisplay stage="Chicken"/>
                    <StageCountDisplay stage="Mother Hen"/>
                </div>
            </Card>
        </div>
    )
}

export default StageCounts
