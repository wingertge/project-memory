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

import {Checkbox, TableCell, TableHead, TableRow, TableSortLabel, Tooltip} from "@material-ui/core"
import * as React from "react"
import {useTranslation} from "react-i18next"

interface PropTypes {
    onSelectAllClick: (event) => void
    order: "asc" | "desc"
    orderBy: string
    numSelected: number
    rowCount: number
    rows: any[]
    onRequestSort: (event, prop) => void
    own?: boolean
}

const CardTableHead = ({onSelectAllClick, onRequestSort, order, orderBy, numSelected, rowCount, rows, own}: PropTypes) => {
    const {t} = useTranslation()
    return (
        <TableHead>
            <TableRow>
                {own && (
                    <TableCell padding="checkbox">
                        <Checkbox
                            indeterminate={(numSelected > 0 && numSelected < rowCount) || rowCount === 0}
                            checked={numSelected === rowCount && numSelected > 0} onChange={onSelectAllClick}
                            disabled={rowCount === 0}
                        />
                    </TableCell>
                )}
                {rows.map(row => (
                    <TableCell key={row.id} align={row.numeric ? "right" : "left"}
                               padding={row.disablePadding ? "none" : "default" as any}
                               sortDirection={orderBy === row.id ? order : false}>
                        <Tooltip title={t("Sort")} placement={row.numeric ? "bottom-end" : "bottom-start"}
                                 enterDelay={300}>
                            <TableSortLabel active={orderBy === row.id} direction={order}
                                            onClick={event => onRequestSort(event, row.id)}>
                                {t(row.label)}
                            </TableSortLabel>
                        </Tooltip>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}

export default CardTableHead
