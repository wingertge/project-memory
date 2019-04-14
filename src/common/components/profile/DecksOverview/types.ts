import {WithStyles} from "@material-ui/styles"
import {RouteComponentProps} from "react-router"
import {Deck} from "../../../../generated/graphql"
import {WithDialog} from "../../../enhancers"
import styles from "./styles"
import {PropTypes as CreateDeckFormTypes} from "./CreateDeckForm"

export interface GraphQLTypes {
    id: string
    ownedDecks: Deck[]
    subscribedDecks: Deck[]
}

export type Props = WithStyles<typeof styles> & GraphQLTypes & RouteComponentProps<{}> & WithDialog<CreateDeckFormTypes>
