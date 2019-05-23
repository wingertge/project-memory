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

import {RouteComponentProps} from "@reach/router"
import React, {ReactElement} from "react"
import {useLoginExpiryQuery} from "../../../generated/graphql"
import {useID} from "../../hooks"

interface PropTypes extends RouteComponentProps<any> {
    render: (props: RouteComponentProps<any> & {authenticated: boolean}) => ReactElement
}

export const Switched = ({render, ...props}: PropTypes) => {
    const id = useID()
    const {data} = useLoginExpiryQuery()
    const authenticated = id !== "" && new Date(data!.loginExpiresAt) >= new Date()

    return render({...props, authenticated})!
}

export default Switched
