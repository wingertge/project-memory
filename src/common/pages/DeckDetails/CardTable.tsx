import {
    Checkbox,
    createStyles, IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TablePagination,
    TableRow,
    Theme,
    withStyles,
    WithStyles
} from "@material-ui/core"
import {Edit} from "@material-ui/icons"
import * as React from "react"
import {withTranslation, WithTranslation} from "react-i18next"
import {RouteComponentProps, withRouter} from "react-router"
import {compose, pure, withHandlers, withProps} from "recompose"
import {oc} from "ts-optchain"
import {Card, withGetCards} from "../../../generated/graphql"
import {withDialog, WithDialog, withRouteProps, withState} from "../../enhancers"
import EditCardForm, {PropTypes as CardFormPropTypes} from "./EditCardForm"
import CardTableHead from "./CardTableHead"
import CardTableToolbar from "./CardTableToolbar"
import {Column, RouteTypes} from "./types"

const rows = [
    {id: "meaning", numeric: false, disablePadding: true, label: "Meaning"},
    {id: "pronunciation", numeric: false, disablePadding: true, label: "Pronunciation"},
    {id: "translation", numeric: false, disablePadding: true, label: "Translation"},
    {id: "actions", numeric: true, disablePadding: true, label: ""}
]

interface PropTypes {
    deckId: string
}

interface StateTypes {
    selected: string[]
    rowsPerPage: number
}

interface UpdaterTypes {
    updateSelected: (state: string[]) => string[]
    updateRowsPerPage: (state: number) => number
}

interface HandlerTypes {
    isSelected: (id: string) => boolean
    onRowClicked: (event, id: string) => void
    onChangePage: (event, page: number) => void
    onChangeRowsPerPage: (event) => void
    onSelectAllClick: (event) => void
    onRequestSort: (event, prop: Column) => void
    onEditClicked: (card: Pick<Card, "id" | "meaning" | "pronunciation" | "translation">) => void
}

interface InjectedPropTypes {
    emptyRows: number
}

interface GraphQLTypes {
    cards: Array<Pick<Card, "id" | "meaning" | "pronunciation" | "translation">>
    cardCount: number
}

// @ts-ignore
type Props = WithStyles<typeof styles> & WithTranslation & PropTypes & StateTypes & UpdaterTypes & HandlerTypes & InjectedPropTypes & RouteComponentProps<RouteTypes> & RouteTypes & GraphQLTypes & WithDialog<CardFormPropTypes>

const styles = (theme: Theme) => createStyles({
    root: {
        width: "100%",
        marginTop: theme.spacing.unit * 3,
    },
    table: {
        minWidth: 1020,
    },
    tableWrapper: {
        overflowX: "auto",
    }
})

const CardTable = ({t, classes, cards, cardCount, onRowClicked, isSelected, emptyRows, rowsPerPage, page, onChangePage, onChangeRowsPerPage, onSelectAllClick, selected, sortDirection, sortBy, onRequestSort, onEditClicked}: Props) => (
    <Paper className={classes.root}>
        <CardTableToolbar numSelected={selected.length}/>
        <div className={classes.tableWrapper}>
            <Table className={classes.table} aria-labelledby="tableTitle">
                <CardTableHead numSelected={selected.length} order={sortDirection || "asc"} orderBy={sortBy || "meaning"} onSelectAllClick={onSelectAllClick} onRequestSort={onRequestSort} rowCount={rowsPerPage - emptyRows} rows={rows}/>
                <TableBody>
                    {cards.map(card => (
                        <TableRow hover role="checkbox" aria-checked={false} tabIndex={-1} key={card.id} selected={false}>
                            <TableCell padding="checkbox" onClick={event => onRowClicked(event, card.id)}>
                                <Checkbox checked={isSelected(card.id)} />
                            </TableCell>
                            <TableCell padding="none" onClick={event => onRowClicked(event, card.id)}>
                                {card.meaning}
                            </TableCell>
                            <TableCell padding="none" onClick={event => onRowClicked(event, card.id)}>
                                {card.pronunciation}
                            </TableCell>
                            <TableCell padding="none" onClick={event => onRowClicked(event, card.id)}>
                                {card.translation}
                            </TableCell>
                            <TableCell padding="none" align="right">
                                <IconButton onClick={() => onEditClicked(card)}>
                                    <Edit />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                    {emptyRows > 0 && (
                        <TableRow style={{height: 49 * emptyRows}}>
                            <TableCell colSpan={6}/>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
        <TablePagination
            rowsPerPageOptions={[5, 10, 30, 50, 100]}
            component="div"
            count={cardCount} rowsPerPage={rowsPerPage} page={page as number}
            backIconButtonProps={{
                "aria-label": t("Previous Page")
            }}
            nextIconButtonProps={{
                "aria-label": t("Next Page")
            }}
            onChangePage={onChangePage}
            onChangeRowsPerPage={onChangeRowsPerPage}
        />
    </Paper>
)

const formatPath = (id: string, page: number, sortDirection: "asc" | "desc", sortBy: "meaning" | "pronunciation" | "translation") => {
    let path = sortDirection !== "asc" ? `/sortDirection/${sortDirection}` : ""
    if(sortBy !== "meaning" || path !== "")
        path = `/sortBy/${sortBy}` + path
    return `/deck/${id}/page/${page}` + path
}

const toInt = (str?: string) => parseInt(str || "0", 10)

export default compose<Props, PropTypes>(
    pure,
    withStyles(styles),
    withTranslation(),
    withRouter,
    withState<Props, string[]>("selected", "updateSelected", []),
    withState<Props, number>("rowsPerPage", "updateRowsPerPage", 30),
    withRouteProps<Props>([page => toInt(page), "page"], [sortBy => sortBy || "meaning", "sortBy"], [sortDir => sortDir || "asc", "sortDirection"]),
    withDialog<Props, CardFormPropTypes>(EditCardForm),
    withGetCards<Props, GraphQLTypes>({
        options: ({deckId, rowsPerPage, page, sortBy, sortDirection}) => ({
            variables: {
                deckID: deckId,
                filter: {
                    limit: rowsPerPage,
                    offset: page * rowsPerPage,
                    sortBy,
                    sortDirection
                }
            }
        }),
        props: ({data}) => ({
            data,
            cards: oc(data).deck.cards([]).filter(a => !!a) as any,
            cardCount: oc(data).deck.cardCount(0)
        })
    }),
    withHandlers<Props, HandlerTypes>({
        isSelected: ({selected}) => (id: string) => selected.indexOf(id) !== -1,
        onRowClicked: ({selected, updateSelected}) => (event, id: string) => {
            const selectedIndex = selected.indexOf(id)
            const newSelected = selectedIndex === -1 ? [...selected, id] : selected.filter(selectedId => selectedId !== id)

            updateSelected(newSelected)
        },
        onChangePage: ({history, deckId, sortDirection, sortBy}) => (_, page) => {
            history.push(formatPath(deckId, page, sortDirection || "asc", sortBy || "meaning"))
        },
        onChangeRowsPerPage: ({updateRowsPerPage, selected, updateSelected, cards}) => event => {
            updateRowsPerPage(event.target.value)
            updateSelected(selected.filter(id => cards.findIndex(card => card.id === id) < event.target.value))
        },
        onSelectAllClick: ({updateSelected, cards}) => event => event.target.checked ? updateSelected(cards.map(card => card.id)) : updateSelected([]),
        onRequestSort: ({sortDirection, sortBy, history, deckId, page}) => (event, prop) => {
            if(sortBy === prop && sortDirection === "asc")
                history.push(formatPath(deckId, page, "desc", prop))
            else history.push(formatPath(deckId, page, "asc", prop))
        },
        onEditClicked: ({openDialog, deckId}) => card => {
            openDialog({deckId, card})
        }
    }),
    withProps<InjectedPropTypes, Props>(({rowsPerPage, page, cardCount}) => ({
        emptyRows: rowsPerPage - Math.min(rowsPerPage, cardCount - page * rowsPerPage)
    }))
)(CardTable)