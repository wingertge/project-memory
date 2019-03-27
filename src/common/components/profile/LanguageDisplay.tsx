import React from "react"
import {withStyles, createStyles, Theme, WithStyles, Chip, Avatar} from "@material-ui/core"
import * as PropTypes from "prop-types"
import {WithTranslation, withTranslation} from "react-i18next"
import {RouteComponentProps, withRouter} from "react-router"
import {compose, pure, withHandlers} from "recompose"
import {Language} from "../../../generated/graphql"

const styles = (theme: Theme) => createStyles({
    languageName: {
        fontWeight: "bold",
        display: "inline",
        paddingLeft: theme.spacing.unit / 2,
        verticalAlign: "middle"
    },
    container: {
        display: "inline-block"
    },
    languageIcon: {
        verticalAlign: "middle"
    },
    chip: {
        margin: theme.spacing.unit
    }
})

interface PropTypes {
    language: Language
}

interface HandlerTypes {
    onLanguageClick: () => void
}

type Props = WithStyles<typeof styles> & PropTypes & HandlerTypes & WithTranslation & RouteComponentProps<{}>

/*const LanguageDisplay = ({language: {name, nativeName, languageCode}, classes, t}: Props) => (
    <LinkButton className={classes.container} to={`/language/${languageCode}`}>
        <img src={`/static/media/${languageCode}.png`} width="20" height="15" alt={languageCode} className={classes.languageIcon} />
        <Typography variant="body1" className={classes.languageName}>
            {`${t(name)} (${nativeName})`}
        </Typography>
    </LinkButton>
)*/

const LanguageDisplay = ({language: {name, nativeName, languageCode}, classes, t, onLanguageClick}: Props) => (
    <Chip
        avatar={<Avatar src={`/static/media/flags/${languageCode}.png`} alt={languageCode} />}
        label={`${t(name)} (${nativeName})`}
        onClick={onLanguageClick}
        className={classes.chip}
    />
)

export default compose<Props, PropTypes>(
    pure,
    withStyles(styles),
    withTranslation(),
    withRouter,
    withHandlers<Props, HandlerTypes>({
        onLanguageClick: ({history, language: {languageCode}}) => () => history.push(`/language/${languageCode}`)
    })
)(LanguageDisplay)
