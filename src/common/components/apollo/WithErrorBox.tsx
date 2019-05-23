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

import {ApolloError} from "apollo-client"
import React from "react"
import {useTranslation} from "react-i18next"
import ErrorBox from "./ErrorBox"

interface PropTypes {
    prop: {error?: ApolloError}
    retry?: (data: any) => void
    children: any
}

export const WithErrorBox = ({prop: {error}, retry, children}: PropTypes) => {
    const {t} = useTranslation()
    const title = error && (error.message.includes(":") ? error.message.split(":")[0].trim() : "Error")
    const message = error && (error.message.includes(":") ? error.message.split(":")[1].trim() : error.message.trim())
    return (
        <>
            {error && <ErrorBox title={t(title!)} text={t(message!)} retry={retry} />}
            {children}
        </>
    )
}

export default WithErrorBox
