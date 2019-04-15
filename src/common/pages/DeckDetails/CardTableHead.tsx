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
}

const CardTableHead = ({onSelectAllClick, onRequestSort, order, orderBy, numSelected, rowCount, rows}: PropTypes) => {
    const {t} = useTranslation()
    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox indeterminate={numSelected > 0 && numSelected < rowCount}
                              checked={numSelected === rowCount} onChange={onSelectAllClick}/>
                </TableCell>
                {rows.map(row => (
                    <TableCell key={row.id} align={row.numeric ? "right" : "left"}
                               padding={row.disablePadding ? "none" : "normal"}
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
