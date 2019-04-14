import {createStyles, withStyles, WithStyles} from "@material-ui/styles"
import React from "react"
import {Theme, Chip, Avatar} from "@material-ui/core"
import * as PropTypes from "prop-types"
import {WithTranslation, withTranslation} from "react-i18next"
import {RouteComponentProps, withRouter} from "react-router"
import {compose, pure} from "recompose"
import {Language} from "../../../generated/graphql"

const styles = (theme: Theme) => createStyles({
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
})

interface PropTypes {
    language: Language
    onDelete?: () => void
}

type Props = WithStyles<typeof styles> & PropTypes & WithTranslation & RouteComponentProps<{}>

const LanguageDisplay = ({language: {name, nativeName, languageCode}, classes, t, onDelete}: Props) => (
    <Chip
        avatar={<Avatar src={`/static/media/flags/${languageCode}.png`} alt={languageCode} />}
        label={`${t(name)} (${nativeName})`}
        onDelete={onDelete}
        className={classes.chip}
    />
)

export default compose<Props, PropTypes>(
    pure,
    withStyles(styles),
    withTranslation(),
    withRouter
)(LanguageDisplay)
