import {Theme} from "@material-ui/core"
import {useTheme} from "@material-ui/styles"
import * as React from "react"

interface PropTypes {
    multiplier?: number
}


export const Spacer = ({multiplier}: PropTypes) => {
    const theme = useTheme<Theme>()
    return (
        <div style={{
            minHeight: theme.spacing(multiplier || 1)
        }}/>
    )
}

export default Spacer
