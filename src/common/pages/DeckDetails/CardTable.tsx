import {
    Checkbox,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell, TableFooter,
    TablePagination,
    TableRow,
    Theme
} from "@material-ui/core"
import {Edit} from "@material-ui/icons"
import {createStyles, makeStyles} from "@material-ui/styles"
import {Dispatch, SetStateAction, useState} from "react"
import * as React from "react"
import {useTranslation} from "react-i18next"
import {oc} from "ts-optchain"
import useRouter from "use-react-router/use-react-router"
import {Deck, useCardsQuery, useDeleteCardsMutation} from "../../../generated/graphql"
import {useDialog, useFormState} from "../../hooks"
import EditCardForm from "./EditCardForm"
import CardTableHead from "./CardTableHead"
import CardTableToolbar from "./CardTableToolbar"
import {Column, SortDirection} from "./DeckDetails"

interface PropTypes {
    rowsPerPage: number
    setRowsPerPage: Dispatch<SetStateAction<number>>
    deck: Deck
    own?: boolean
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        width: "100%",
        marginTop: theme.spacing(3),
    },
    table: {
        minWidth: 1020,
    },
    tableWrapper: {
        overflowX: "auto",
    },
    actions: {
        width: 1,
        whiteSpace: "nowrap"
    }
}))

interface RouteTypes {
    id: string
    page: string
    sortBy: Column
    sortDirection: SortDirection
}

const CardTable = (
    {rowsPerPage, setRowsPerPage, deck, own}: PropTypes
) => {
    const classes = useStyles()
    const {t} = useTranslation()
    const {history, match: {params: {id, page: initialPage, sortBy: initialSortBy, sortDirection: initialSortDirection}}} = useRouter<RouteTypes>()

    const [selected, setSelected] = useState<string[]>([])
    const [page, setPage] = useState<number>(parseInt(initialPage || "0", 10))
    const [sortBy, setSortBy] = useState<Column>(initialSortBy || "meaning")
    const [sortDirection, setSortDirection] = useState<SortDirection>(initialSortDirection || "asc")
    const {search} = useFormState<{search: string}>({search: ""})

    const {Dialog, openDialog} = useDialog(EditCardForm)
    const {data} = useCardsQuery({
        variables: {
            deckID: id,
            filter: {
                limit: rowsPerPage,
                offset: page * rowsPerPage,
                sortBy,
                sortDirection,
                search: search.value.trim().length > 0 ? search.value : undefined
            }
        }
    })

    const cards = oc(data).deck.cards([]).filter(a => !!a) as any
    const cardCount = oc(data).deck.cardCount(0)
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, cardCount - page * rowsPerPage)
    const hasPronunciation = deck.language.hasPronunciation

    const deleteCards = useDeleteCardsMutation({
        variables: {
            deckId: id,
            cardIds: selected,
            cardFilter: {
                limit: rowsPerPage,
                offset: page * rowsPerPage,
                sortBy,
                sortDirection
            }
        },
        optimisticResponse: () => {
            const response = {
                __typename: "Mutation",
                deleteCards: {
                    __typename: "Deck",
                    id,
                    cards: cards.filter(card => !selected.includes(card.id))
                }
            }
            setSelected([])
            return response as any
        }
    })

    const formatPath = () => {
        let path = sortDirection !== "asc" ? `/sortDirection/${sortDirection}` : ""
        if(sortBy !== "meaning" || path !== "")
            path = `/sortBy/${sortBy}` + path
        return `/deck/${id}/page/${page}` + path
    }

    const changeRowsPerPage = event => {
        setRowsPerPage(event.target.value)
        setSelected(selected.filter(cardId => cards.findIndex(card => card.id === cardId) < event.target.value))
    }

    const changePage = (_, newPage: number) => {
        history.push(formatPath())
        setPage(newPage)
    }

    const onRowClicked = (event, rowId: string) => {
        const selectedIndex = selected.indexOf(rowId)
        const newSelected = selectedIndex === -1 ? [...selected, rowId] : selected.filter(selectedId => selectedId !== rowId)

        setSelected(newSelected)
    }

    const requestSort = (event, prop) => {
        setSortBy(prop)
        if(sortBy === prop && sortDirection === "asc") {
            history.push(formatPath())
            setSortDirection("desc")
        } else {
            history.push(formatPath())
            setSortDirection("asc")
        }
    }

    let columns = [
        {id: "meaning", numeric: false, disablePadding: false, label: "Meaning"},
        {id: "pronunciation", numeric: false, disablePadding: false, label: "Pronunciation"},
        {id: "translation", numeric: false, disablePadding: false, label: "Translation"},
        {id: "actions", numeric: true, disablePadding: true, label: ""}
    ]
    if(!hasPronunciation) columns = columns.filter(col => col.id !== "pronunciation")
    if(!own) columns = columns.filter(col => col.id !== "actions")

    return (
        <>
            <Dialog />
            <Paper className={classes.root}>
                <CardTableToolbar numSelected={selected.length} onDeleteClicked={deleteCards} search={search.value} onSearchChange={search.onChange}/>
                <div className={classes.tableWrapper}>
                    <Table className={classes.table} aria-labelledby="tableTitle" size="small">
                        <CardTableHead numSelected={selected.length} order={sortDirection || "asc"}
                                       orderBy={sortBy || "meaning"} onSelectAllClick={event => event.target.checked ? setSelected(cards.map(card => card.id)) : setSelected([])}
                                       onRequestSort={requestSort} rowCount={rowsPerPage - emptyRows} rows={columns} own={own}/>
                        <TableBody>
                            {cards.map(card => (
                                <TableRow hover role="checkbox" aria-checked={false} tabIndex={-1} key={card.id}
                                          selected={false}>
                                    {own && (
                                        <TableCell padding="checkbox" onClick={event => onRowClicked(event, card.id)}>
                                            <Checkbox checked={selected.indexOf(card.id) !== -1}/>
                                        </TableCell>
                                    )}
                                    <TableCell padding={"default" as any} onClick={event => onRowClicked(event, card.id)}>
                                        {card.meaning}
                                    </TableCell>
                                    {hasPronunciation && (
                                        <TableCell padding={"default" as any} onClick={event => onRowClicked(event, card.id)}>
                                            {card.pronunciation}
                                        </TableCell>
                                    )}
                                    <TableCell padding={"default" as any} onClick={event => onRowClicked(event, card.id)}>
                                        {card.translation}
                                    </TableCell>
                                    {own && (
                                        <TableCell padding="none" align="right" className={classes.actions}>
                                            <IconButton onClick={() => openDialog({
                                                deckId: id,
                                                card,
                                                language: deck.language,
                                                nativeLanguage: deck.nativeLanguage,
                                                rowsPerPage,
                                                page,
                                                sortBy,
                                                sortDirection
                                            })}>
                                                <Edit/>
                                            </IconButton>
                                        </TableCell>
                                    )}
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 30, 50, 100]}
                                    count={cardCount} rowsPerPage={rowsPerPage} page={page as number}
                                    backIconButtonProps={{
                                        "aria-label": t("Previous Page")
                                    }}
                                    nextIconButtonProps={{
                                        "aria-label": t("Next Page")
                                    }}
                                    onChangePage={changePage}
                                    onChangeRowsPerPage={changeRowsPerPage}
                                    align="right"
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </div>
            </Paper>
        </>
    )
}

export default CardTable
