import {Theme} from "@material-ui/core"
import {makeStyles} from "@material-ui/styles"
import * as React from "react"

interface PropTypes {
    children: JSX.Element | string | Array<JSX.Element | string>
}

const useStyles = makeStyles((theme: Theme) => ({
    content: {
        padding: theme.spacing(0.5, 1)
    }
}))

export const MyCardContent = ({children}: PropTypes) => {
    const classes = useStyles()

    return (
        <div className={classes.content}>
            {children}
        </div>
    )
}

export default MyCardContent
