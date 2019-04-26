import {useState} from "react"
import * as React from "react"
import {oc} from "ts-optchain"
import useRouter from "use-react-router/use-react-router"
import {Deck, useDeckDetailsQuery} from "../../../generated/graphql"
import ApolloErrorBox from "../../components/common/ApolloErrorBox"
import {useID, ValidatorMap} from "../../hooks"
import {longerThan, notEmpty, shorterThan} from "../../util/validationUtils"
import CardTable from "./CardTable"
import {DeckEditForm} from "./DeckEditForm"
import {Column, SortDirection} from "./DeckDetails"

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

export const deckPropsValidators: ValidatorMap<Form> = {
    name: [
        {fun: notEmpty, message: "Name can't be empty"},
        {fun: longerThan(2), message: "Name needs to be at least 3 characters long"},
        {fun: shorterThan(25), message: "Name needs to be 24 characters or less"}
    ]
}

export const DeckDetails = () => {
    const {match: {params: {id}}} = useRouter<RouteTypes>()
    const userId = useID()

    const {data, loading, error} = useDeckDetailsQuery({
        variables: {
            deckID: id
        }
    })

    const deck = data!.deck as Deck
    const isOwn = oc(deck).owner.id() === userId
    const [rowsPerPage, setRowsPerPage] = useState<number>(30)

    if(error) return <ApolloErrorBox error={error} />
    if(loading) return null

    return (
        <>
            <div>
                <DeckEditForm deck={deck} rowsPerPage={rowsPerPage} />
                <CardTable rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} deck={deck} own={isOwn} />
            </div>
        </>
    )

}

export default DeckDetails
