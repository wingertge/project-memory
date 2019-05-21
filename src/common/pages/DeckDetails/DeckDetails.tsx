import {createStyles, makeStyles} from "@material-ui/styles"
import {useState} from "react"
import * as React from "react"
import Helmet from "react-helmet"
import {useTranslation} from "react-i18next"
import {oc} from "ts-optchain"
import useRouter from "use-react-router/use-react-router"
import {Deck, useCardsQuery, useDeckDetailsQuery} from "../../../generated/graphql"
import ApolloErrorBox from "../../components/apollo/ApolloErrorBox"
import {useFormState, useID, ValidatorMap} from "../../hooks"
import {Theme} from "../../theme"
import {longerThan, notEmpty, shorterThan} from "../../util/validationUtils"
import CardTable from "./CardTable"
import {DeckEditForm} from "./DeckEditForm"
import {Column, SortDirection} from "./DeckDetails"
import DeckProperties from "./DeckProperties"

export type SortDirection = "asc" | "desc"
export type Column = "meaning" | "pronunciation" | "translation"

export interface RouteTypes {
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

export const DeckDetails = () => {
    const classes = useStyles()
    const {t} = useTranslation()
    const {match: {params: {id, page: initialPage, sortBy: initialSortBy, sortDirection: initialSortDirection}}} = useRouter<RouteTypes>()
    const userId = useID()

    const {data, loading, error} = useDeckDetailsQuery({
        variables: {
            deckID: id
        }
    })

    const [rowsPerPage, setRowsPerPage] = useState<number>(30)
    const [page, setPage] = useState<number>(parseInt(initialPage || "0", 10))
    const [sortBy, setSortBy] = useState<Column>(initialSortBy || "meaning")
    const [sortDirection, setSortDirection] = useState<SortDirection>(initialSortDirection || "asc")
    const {search} = useFormState<{search: string}>({search: ""})

    const {data: cardsData} = useCardsQuery({
        variables: {
            deckID: id,
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

    if(error) return <ApolloErrorBox error={error} />
    if(loading) return null

    return (
        <>
            <Helmet>
                <title>{t("Deck {{deckName}} - Project Memory", {deckName: deck.name})}</title>
            </Helmet>
            <div className={classes.root}>
                {!isOwn && <DeckProperties deck={deck} />}
                {isOwn && <DeckEditForm deck={deck} rowsPerPage={rowsPerPage} cards={cards} search={search.value} />}
                <CardTable
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
                />
            </div>
        </>
    )

}

export default DeckDetails
