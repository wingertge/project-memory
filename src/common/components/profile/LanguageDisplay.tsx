import {createStyles, makeStyles} from "@material-ui/styles"
import React from "react"
import {Theme, Chip, Avatar} from "@material-ui/core"
import * as PropTypes from "prop-types"
import {useTranslation} from "react-i18next"
import {Language} from "../../../generated/graphql"

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

export const LanguageDisplay = ({language: {name, nativeName, languageCode}, onDelete}: PropTypes) => {
    const classes = useStyles()
    const {t} = useTranslation()

    return (
        <Chip
            avatar={<Avatar src={`/static/media/flags/${languageCode}.png`} alt={languageCode}/>}
            label={`${t(name)} (${nativeName})`}
            onDelete={onDelete}
            className={classes.chip}
        />
    )
}

export default LanguageDisplay
