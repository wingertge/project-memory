import {Theme} from "@material-ui/core"
import {withStyles, WithTheme} from "@material-ui/styles"
import * as React from "react"
import {compose, pure} from "recompose"

interface PropTypes {
    multiplier?: number
}

type Props = WithTheme<Theme> & PropTypes

const Spacer = ({multiplier, theme}: Props) => (
    <div style={{
        minHeight: theme.spacing(multiplier || 1)
    }} />
)

export default compose<Props, PropTypes>(
    pure,
    withStyles({}, {withTheme: true})
)(Spacer)
