import React from "react"
import {withStyles, Typography, createStyles, Theme, WithStyles} from "@material-ui/core"
import * as PropTypes from "prop-types"
import {GetProfile} from "../../../generated-models"
import LinkButton from "../common/LinkButton"

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
    }
})

interface PropTypes {
    language: GetProfile.Languages
}

type Props = WithStyles<typeof styles> & PropTypes

const LanguageDisplay = ({language: {name, nativeName, languageCode}, classes}: Props) => (
    <LinkButton className={classes.container} to={`/language/${languageCode}`}>
        <img src={`/static/media/${languageCode}.png`} width="20" height="15" alt={languageCode} className={classes.languageIcon} />
        <Typography variant="body1" className={classes.languageName}>
            {`${name} (${nativeName})`}
        </Typography>
    </LinkButton>
)

export default withStyles(styles)(LanguageDisplay)
