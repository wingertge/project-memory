import React from "react"
import {Typography} from "@material-ui/core"
import * as PropTypes from "prop-types"

interface PropTypes {
    children: string
    color?: "textPrimary" | "textSecondary" | "error"
    gutterBottom?: boolean
}

export const Heading = ({children, color, gutterBottom = true}: PropTypes) => (
    <Typography variant="h5" gutterBottom={gutterBottom} color={color}>
        {children}
    </Typography>
)

export default Heading
