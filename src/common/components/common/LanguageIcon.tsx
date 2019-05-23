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

import {Avatar} from "@material-ui/core"
import {HTMLAttributes} from "react"
import * as React from "react"
import {useTranslation} from "react-i18next"
import {Language} from "../../../generated/graphql"
import flags from "../../assets/flags"

interface PropTypes extends HTMLAttributes<any> {
    language: Language
}

export const LanguageIcon = ({language, ...rest}: PropTypes) => {
    const {t} = useTranslation()
    return <Avatar src={flags[language.languageCode]} alt={t(language.name)} {...rest} />
}

export default LanguageIcon
