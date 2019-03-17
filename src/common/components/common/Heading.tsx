import React, {ComponentType} from "react"
import {createStyles, Typography, WithStyles, withStyles} from "@material-ui/core"
import * as PropTypes from "prop-types"

const styles = createStyles({})

interface PropTypes {
    children: string
}

type Props = WithStyles<typeof styles> & PropTypes

const Heading = ({children}: Props) => (
    <Typography variant="h5" gutterBottom>
        {children}
    </Typography>
)

export default withStyles(styles)(Heading)
