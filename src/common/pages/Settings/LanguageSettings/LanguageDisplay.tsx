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

import {createStyles, makeStyles} from "@material-ui/styles"
import React, {forwardRef} from "react"
import {Theme, Chip} from "@material-ui/core"
import * as PropTypes from "prop-types"
import {useTranslation} from "react-i18next"
import {Language} from "../../../../generated/graphql"
import LanguageIcon from "../../../components/common/LanguageIcon"

const useStyles = makeStyles((theme: Theme) => createStyles({
    languageName: {
        fontWeight: "bold",
        display: "inline",
        paddingLeft: theme.spacing(0.5),
        verticalAlign: "middle"
    },
    container: {
        display: "inline-block"
    },
    languageIcon: {
        verticalAlign: "middle"
    },
    chip: {
        margin: theme.spacing(1)
    }
}))

interface PropTypes {
    language: Language
    onDelete?: () => void
    onClick?: () => void
    title?: string
}

export const LanguageDisplay = forwardRef<HTMLDivElement, PropTypes>(({language, onDelete, onClick, title}: PropTypes, ref) => {
    const classes = useStyles()
    const {t} = useTranslation()
    const {name, nativeName} = language

    return (
        <Chip
            avatar={<LanguageIcon language={language} />}
            label={`${t(name)} (${nativeName})`}
            onDelete={onDelete}
            onClick={onClick}
            className={classes.chip}
            ref={ref}
            title={title}
        />
    )
})

export default LanguageDisplay
