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

import {createStyles, makeStyles} from "@material-ui/styles"
import {RouteComponentProps} from "@reach/router"
import {useState} from "react"
import * as React from "react"
import Helmet from "react-helmet"
import {useTranslation} from "react-i18next"
import {oc} from "ts-optchain"
import {Deck, useCardsQuery, useDeckDetailsQuery} from "../../../generated/graphql"
import ApolloErrorBox from "../../components/apollo/ApolloErrorBox"
import {useDialog, useFormState, useID, ValidatorMap} from "../../hooks"
import {Theme} from "../../theme"
import {longerThan, notEmpty, shorterThan} from "../../util/validationUtils"
import CardTable from "./CardTable"
import {DeckEditForm} from "./DeckEditForm"
import {Column, SortDirection} from "./DeckDetails"
import DeckProperties from "./DeckProperties"
import EditCardForm from "./EditCardForm"

export type SortDirection = "asc" | "desc"
export type Column = "meaning" | "pronunciation" | "translation"

interface RouteTypes {
    id: string,
    page: string
    sortDirection: SortDirection
    sortBy: Column
}

export interface Form {
    name: string
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        paddingTop: theme.spacing(2)
    }
}))

export const deckPropsValidators: ValidatorMap<Form> = {
    name: [
        {fun: notEmpty, message: "Name can't be empty"},
        {fun: longerThan(2), message: "Name needs to be at least 3 characters long"},
        {fun: shorterThan(41), message: "Name needs to be 40 characters or less"}
    ]
}

export const DeckDetails = ({id, page: initialPage, sortDirection: initialSortDirection, sortBy: initialSortBy}: RouteComponentProps<RouteTypes>) => {
    const classes = useStyles()
    const {t} = useTranslation()
    const userId = useID()

    const {data, loading, error} = useDeckDetailsQuery({
        variables: {
            deckID: id!
        }
    })

    const [rowsPerPage, setRowsPerPage] = useState<number>(30)
    const [page, setPage] = useState<number>(parseInt(initialPage || "0", 10))
    const [sortBy, setSortBy] = useState<Column>(initialSortBy || "meaning")
    const [sortDirection, setSortDirection] = useState<SortDirection>(initialSortDirection || "asc")
    const {search} = useFormState<{search: string}>({search: ""})

    const {data: cardsData} = useCardsQuery({
        variables: {
            deckID: id!,
            limit: rowsPerPage,
            offset: page * rowsPerPage,
            filter: {
                search: search.value.trim().length > 0 ? search.value : undefined
            },
            sort: {
                sortBy,
                sortDirection
            }
        }
    })

    const cards = oc(cardsData).deck.cards([]).filter(a => !!a) as any
    const cardCount = oc(cardsData).deck.cardCount(0)

    const deck = data!.deck as Deck
    const isOwn = oc(deck).owner.id() === userId
    const {Dialog, openDialog} = useDialog(EditCardForm)

    if(error) return <ApolloErrorBox error={error} />
    if(loading) return null

    return (
        <>
            <Dialog />
            <Helmet>
                <title>{t("Deck {{deckName}} - Project Memory", {deckName: deck.name})}</title>
            </Helmet>
            <div className={classes.root}>
                {!isOwn && <DeckProperties deck={deck} />}
                {isOwn && (
                    <DeckEditForm
                        deck={deck}
                        rowsPerPage={rowsPerPage}
                        cards={cards}
                        search={search.value}
                        openDialog={openDialog}
                        page={page}
                        sortDirection={sortDirection}
                        sortBy={sortBy}
                    />
                )}
                <CardTable
                    id={id!}
                    rowsPerPage={rowsPerPage}
                    setRowsPerPage={setRowsPerPage}
                    page={page}
                    setPage={setPage}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    sortDirection={sortDirection}
                    setSortDirection={setSortDirection}
                    deck={deck} own={isOwn}
                    cards={cards}
                    cardCount={cardCount}
                    search={search.value}
                    onSearchChange={search.onChange}
                    openDialog={openDialog}
                />
            </div>
        </>
    )

}

export default DeckDetails
