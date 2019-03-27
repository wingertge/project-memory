import React, {ComponentType} from "react"
import {createStyles, Typography, WithStyles, withStyles} from "@material-ui/core"
import * as PropTypes from "prop-types"
import {compose, pure} from "recompose"

const styles = createStyles({})

interface PropTypes {
    children: string
    color?: "textPrimary" | "textSecondary" | "error"
    gutterBottom?: boolean
}

type Props = WithStyles<typeof styles> & PropTypes

const Heading = ({children, color, gutterBottom = true}: Props) => (
    <Typography variant="h5" gutterBottom={gutterBottom} color={color}>
        {children}
    </Typography>
)

export default compose<Props, PropTypes>(
    pure,
    withStyles(styles)
)(Heading)
