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

import {IconButton, TextField, Theme, Toolbar, Tooltip, Typography} from "@material-ui/core"
import {lighten} from "@material-ui/core/styles/colorManipulator"
import {Delete, FilterList} from "@material-ui/icons"
import {createStyles, makeStyles} from "@material-ui/styles"
import clsx from "clsx"
import {useState} from "react"
import * as React from "react"
import {useTranslation} from "react-i18next"
import {toggle} from "../../../util"

interface PropTypes {
    numSelected: number
    onDeleteClicked: () => void
    search: string
    onSearchChange: (event) => void
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        padding: theme.spacing(0, 2),
        flexDirection: "column"
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
    },
    toolbarRow: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: "100%"
    },
    textField: {
        marginBottom: theme.spacing(2)
    }
}))

const CardTableToolbar = ({numSelected, onDeleteClicked, search, onSearchChange}: PropTypes) => {
    const classes = useStyles()
    const {t} = useTranslation()
    const [filterOpen, setFilterOpen] = useState(false)

    return (
        <Toolbar className={clsx(classes.root, {[classes.highlight]: numSelected > 0})}>
            <div className={classes.toolbarRow}>
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
                            <IconButton onClick={toggle(setFilterOpen)}>
                                <FilterList/>
                            </IconButton>
                        </Tooltip>
                    )}
                </div>
            </div>
            {filterOpen && (
                <div className={classes.toolbarRow}>
                    <TextField fullWidth variant="outlined" label={t("Search")} value={search} onChange={onSearchChange} className={classes.textField} />
                </div>
            )}
        </Toolbar>
    )
}

export default CardTableToolbar
