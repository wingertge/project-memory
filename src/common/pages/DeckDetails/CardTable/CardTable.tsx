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
import {navigate} from "@reach/router"
import {Dispatch, SetStateAction, useEffect, useState} from "react"
import * as React from "react"
import {useTranslation} from "react-i18next"
import {Card, CardSortingOptions, Deck, useDeleteCardsMutation} from "../../../../generated/graphql"
import {useConfirmDialog} from "../../../hooks"
import {PropTypes as CardFormPropTypes} from "../EditCardForm"
import CardTableHead from "./CardTableHead"
import CardTableToolbar from "./CardTableToolbar"
import {SortDirection} from "../DeckDetails"

interface PropTypes {
    id: string
    rowsPerPage: number
    setRowsPerPage: Dispatch<SetStateAction<number>>
    page: number
    setPage: Dispatch<SetStateAction<number>>
    sortBy: CardSortingOptions
    setSortBy: Dispatch<SetStateAction<CardSortingOptions>>
    sortDirection: SortDirection
    setSortDirection: Dispatch<SetStateAction<SortDirection>>
    deck: Deck
    own?: boolean
    cards: Card[]
    cardCount: number
    search: string
    onSearchChange: any
    openDialog: (props: Partial<CardFormPropTypes>) => void
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        width: "100%",
        marginTop: theme.spacing(3),
    },
    table: {
        width: "100%"
    },
    tableWrapper: {
        overflowX: "auto",
        width: "100%"
    },
    actions: {
        width: 1,
        whiteSpace: "nowrap"
    }
}))

const CardTable = ({id, rowsPerPage, setRowsPerPage, page, setPage, sortBy, setSortBy, sortDirection, setSortDirection, deck, own, search, onSearchChange, cards, cardCount, openDialog}: PropTypes) => {
    const classes = useStyles()
    const {t} = useTranslation()

    const [selected, setSelected] = useState<string[]>([])

    const hasPronunciation = deck.language.hasPronunciation

    const [deleteCards] = useDeleteCardsMutation({
        variables: {
            deckId: id,
            cardIds: selected,
            limit: rowsPerPage,
            offset: page * rowsPerPage,
            sort: {
                sortBy,
                sortDirection
            },
            filter: {
                search: search.trim().length > 0 ? search : undefined
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
        navigate(formatPath())
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
            setSortDirection("desc")
        } else {
            setSortDirection("asc")
        }
    }

    useEffect(() => {
        navigate(formatPath())
    }, [page, sortBy, sortDirection, id])

    let columns = [
        {id: "meaning", numeric: false, disablePadding: false, label: "Meaning"},
        {id: "pronunciation", numeric: false, disablePadding: false, label: "Pronunciation"},
        {id: "translation", numeric: false, disablePadding: false, label: "Translation"},
        {id: "actions", numeric: true, disablePadding: true, label: ""}
    ]
    if(!hasPronunciation) columns = columns.filter(col => col.id !== "pronunciation")
    if(!own) columns = columns.filter(col => col.id !== "actions")
    const [confirmDelete, ConfirmDeleteDialog] = useConfirmDialog(deleteCards, "Are you sure you want to delete all those cards?", "You can't undo this operation.")

    return (
        <>
            <ConfirmDeleteDialog />
            <Paper className={classes.root}>
                <CardTableToolbar numSelected={selected.length} onDeleteClicked={selected.length >= 30 ? confirmDelete : deleteCards} search={search} onSearchChange={onSearchChange}/>
                <div className={classes.tableWrapper}>
                    <Table className={classes.table} aria-labelledby="tableTitle" size="small">
                        <CardTableHead numSelected={selected.length} order={sortDirection || "asc"}
                                       orderBy={sortBy || "meaning"} onSelectAllClick={event => event.target.checked ? setSelected(cards.map(card => card.id)) : setSelected([])}
                                       onRequestSort={requestSort} rowCount={cards.length} rows={columns} own={own}/>
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
                                                sortDirection,
                                                cards,
                                                search
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
