import {Theme} from "@material-ui/core"
import {makeStyles} from "@material-ui/styles"
import * as React from "react"

interface PropTypes {
    children: JSX.Element | string | Array<JSX.Element | string>
}

const useStyles = makeStyles((theme: Theme) => ({
    card: {
        backgroundColor: theme.palette.background.paper,
        borderRadius: theme.spacing(0.5),
        width: "fit-content",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: theme.palette.text.primary + theme.palette.text.primary.replace("#", "") + "80"
    }
}))

export const MyCard = ({children}: PropTypes) => {
    const classes = useStyles()

    return (
        <div className={classes.card}>
            {children}
        </div>
    )
}

export default MyCard
