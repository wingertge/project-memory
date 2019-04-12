import {WithStyles} from "@material-ui/core"
import Maybe from "graphql/tsutils/Maybe"
import {WithTranslation} from "react-i18next"
import {RouteComponentProps} from "react-router"
import {Deck} from "../../../generated/graphql"
import {FormWithErrors, WithMutation, WithToast} from "../../enhancers"
import {WithDialog} from "../../enhancers"
import {styles} from "./styles"
import {PropTypes as CardFormPropTypes} from "./EditCardForm"

export type SortDirection = "asc" | "desc"
export type Column = "meaning" | "pronunciation" | "translation"

export interface RouteTypes {
    id: string,
    page: number
    sortDirection: SortDirection
    sortBy: Column
}

export interface StateTypes {
    rowsPerPage: number
    updateRowsPerPage: (state: number) => number
}

export interface GraphQLTypes {
    deck: Maybe<Pick<Deck, "id" | "name">>
}

export interface FormTypes {
    name: string
}

export interface FormChangeTypes {
    onNameChange: (event) => void
}

export interface HandlerTypes {
    onSaveClick: () => void
}

export type Form = FormTypes & FormChangeTypes & FormWithErrors<FormTypes>

export type Props = WithStyles<typeof styles> &
    GraphQLTypes &
    RouteTypes &
    StateTypes &
    HandlerTypes &
    RouteComponentProps<{}> & WithTranslation & Form & WithDialog<CardFormPropTypes> & WithToast & WithMutation
