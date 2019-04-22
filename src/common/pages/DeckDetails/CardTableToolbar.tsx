import {IconButton, Theme, Toolbar, Tooltip, Typography} from "@material-ui/core"
import {lighten} from "@material-ui/core/styles/colorManipulator"
import {Delete, FilterList} from "@material-ui/icons"
import {createStyles, makeStyles} from "@material-ui/styles"
import clsx from "clsx"
import * as React from "react"
import {useTranslation} from "react-i18next"

interface PropTypes {
    numSelected: number
    onDeleteClicked: () => void
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        paddingRight: theme.spacing(1)
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
}))

const CardTableToolbar = ({numSelected, onDeleteClicked}: PropTypes) => {
    const classes = useStyles()
    const {t} = useTranslation()
    return (
        <Toolbar className={clsx(classes.root, {[classes.highlight]: numSelected > 0})}>
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
            <div className={classes.spacer}/>
            <div className={classes.actions}>
                {numSelected > 0 ? (
                    <Tooltip title={t("Delete")}>
                        <IconButton onClick={onDeleteClicked}>
                            <Delete/>
                        </IconButton>
                    </Tooltip>
                ) : (
                    <Tooltip title={t("Filter Cards")}>
                        <IconButton>
                            <FilterList/>
                        </IconButton>
                    </Tooltip>
                )}
            </div>
        </Toolbar>
    )
}

export default CardTableToolbar
