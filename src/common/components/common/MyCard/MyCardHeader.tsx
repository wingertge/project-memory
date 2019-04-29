import {Theme} from "@material-ui/core"
import {makeStyles} from "@material-ui/styles"
import * as React from "react"

interface PropTypes {
    children: JSX.Element | string | Array<JSX.Element | string>
}

const useStyles = makeStyles((theme: Theme) => ({
    header: {
        backgroundColor: theme.palette.text.primary + theme.palette.text.primary.replace("#", "")  + "20",
        borderRadius: theme.spacing(0.5, 0.5, 0, 0),
        borderWidth: "0px 0px 1px 0px",
        borderColor: theme.palette.text.primary + theme.palette.text.primary.replace("#", "") + "80",
        borderStyle: "solid",
        width: "100%",
        padding: theme.spacing(0.5, 1)
    }
}))

export const MyCardHeader = ({children}: PropTypes) => {
    const classes = useStyles()

    return (
        <div className={classes.header}>
            {children}
        </div>
    )
}

export default MyCardHeader
