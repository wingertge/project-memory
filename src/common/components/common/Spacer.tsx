import {withStyles, WithTheme} from "@material-ui/core"
import * as React from "react"
import {compose, pure} from "recompose"

interface PropTypes {
    multiplier?: number
}

type Props = WithTheme & PropTypes

const Spacer = ({multiplier, theme}: Props) => (
    <div style={{
        minHeight: theme.spacing.unit * (multiplier || 1)
    }} />
)

export default compose<Props, PropTypes>(
    pure,
    withStyles({}, {withTheme: true})
)(Spacer)
