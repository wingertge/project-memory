import {Button} from "@material-ui/core"
import {ButtonProps} from "@material-ui/core/Button"
import {Link} from "@reach/router"
import React from "react"

interface LinkButtonProps extends ButtonProps {
    to: string
    replace?: boolean
}

export const LinkButton = (props: LinkButtonProps) => <Button {...props} component={Link as any}/>

export default LinkButton
