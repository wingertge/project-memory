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
