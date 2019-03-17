import {Button} from "@material-ui/core"
import {ButtonProps} from "@material-ui/core/Button"
import React from "react"
import {Link} from "react-router-dom"

interface LinkButtonProps extends ButtonProps {
    to: string
    replace?: boolean
}

export default (props: LinkButtonProps) => <Button {...props} component={Link as any}/>
