import {CircularProgress} from "@material-ui/core"
import {withStyles} from "@material-ui/styles"
import {withRouter} from "react-router"
import {compose, pure} from "recompose"
import {oc} from "ts-optchain"
import {renderOnError, renderWhileLoading, withDialog, withID} from "../../../enhancers"
import ErrorBox from "../../common/ErrorBox"
import {DecksOverviewRaw} from "./component"
import CreateDeckForm from "./CreateDeckForm"
import styles from "./styles"
import {GraphQLTypes, Props} from "./types"
import {Deck, withShallowDecks} from "../../../../generated/graphql"

export const DecksOverview = compose<Props, {}>(
    pure,
    withStyles(styles),
    withRouter,
    withID(),
    withShallowDecks<Props, Partial<GraphQLTypes>>({
        options: ({id}) => ({
            variables: {id}
        }),
        props: ({data}) => ({
            data,
            ownedDecks: oc(data).user.ownedDecks([]) as Deck[],
            subscribedDecks: oc(data).user.subscribedDecks([]) as Deck[]
        })
    }),
    renderWhileLoading(CircularProgress),
    renderOnError(ErrorBox),
    withDialog(CreateDeckForm)
)(DecksOverviewRaw)

export default DecksOverview

export * from "./component"
export * from "./types"

