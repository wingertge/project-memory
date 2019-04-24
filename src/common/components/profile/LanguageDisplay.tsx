import {createStyles, makeStyles} from "@material-ui/styles"
import React from "react"
import {Theme, Chip} from "@material-ui/core"
import * as PropTypes from "prop-types"
import {useTranslation} from "react-i18next"
import {Language} from "../../../generated/graphql"
import LanguageIcon from "../common/LanguageIcon"

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
}

export const LanguageDisplay = ({language, onDelete}: PropTypes) => {
    const classes = useStyles()
    const {t} = useTranslation()
    const {name, nativeName} = language

    return (
        <Chip
            avatar={<LanguageIcon language={language} />}
            label={`${t(name)} (${nativeName})`}
            onDelete={onDelete}
            className={classes.chip}
        />
    )
}

export default LanguageDisplay
