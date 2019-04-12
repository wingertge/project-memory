import {createStyles, IconButton, Theme, Toolbar, Tooltip, Typography, withStyles, WithStyles} from "@material-ui/core"
import {lighten} from "@material-ui/core/styles/colorManipulator"
import {Delete, FilterList} from "@material-ui/icons"
import * as React from "react"
import classNames from "classnames"
import {withTranslation, WithTranslation} from "react-i18next"
import {compose, pure} from "recompose"

interface PropTypes {
    numSelected: number
    onDeleteClicked: () => void
}

type Props = WithStyles<typeof styles> & PropTypes & WithTranslation

const styles = (theme: Theme) => createStyles({
    root: {
        paddingRight: theme.spacing.unit
    },
    highlight: theme.palette.type === "light" ?
        {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        } :
        {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark
        },
    spacer: {
        flex: "1 1 100%"
    },
    title: {
        flex: "0 0 auto"
    },
    actions: {
        color: theme.palette.text.secondary,
    }
})

const CardTableToolbar = ({t, classes, numSelected, onDeleteClicked}: Props) => (
    <Toolbar className={classNames(classes.root, {[classes.highlight]: numSelected > 0})}>
        <div className={classes.title}>
            {numSelected > 0 ? (
                <Typography color="inherit" variant="subtitle1">
                    {numSelected + t(" selected")}
                </Typography>
            ) : (
                <Typography variant="h6" id="tableTitle">
                    {t("Cards")}
                </Typography>
            )}
        </div>
        <div className={classes.spacer} />
        <div className={classes.actions}>
            {numSelected > 0 ? (
                <Tooltip title={t("Delete")}>
                    <IconButton onClick={onDeleteClicked}>
                        <Delete />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title={t("Filter Cards")}>
                    <IconButton>
                        <FilterList />
                    </IconButton>
                </Tooltip>
            )}
        </div>
    </Toolbar>
)

export default compose<Props, PropTypes>(
    pure,
    withStyles(styles),
    withTranslation()
)(CardTableToolbar)
