/*
The following is the license for the Project Memory Frontend, a frontend for the Project Memory web app.
Copyright (C) 2019  Genna Wingert

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

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
