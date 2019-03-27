import {CircularProgress, withStyles} from "@material-ui/core"
import {compose, pure} from "recompose"
import {oc} from "ts-optchain"
import {renderOnError, renderWhileLoading, withID} from "../../../enhancers"
import {joinDecks} from "../../../selectors"
import ErrorBox from "../../common/ErrorBox"
import {DecksOverviewRaw} from "./component"
import styles from "./styles"
import {GraphQLTypes, Props} from "./types"
import {
    withGetDecksShallow
} from "../../../../generated/graphql"

export const DecksOverview = compose<Props, {}>(
    pure,
    withStyles(styles),
    withID(),
    withGetDecksShallow<Props, Partial<GraphQLTypes>>({
        options: ({id}) => ({
            variables: {id}
        }),
        props: ({data}) => ({
            data,
            ownedDecks: oc(data).user.ownedDecks() as any,
            subscribedDecks: oc(data).user.subscribedDecks() as any
        })
    }),
    renderWhileLoading(CircularProgress),
    renderOnError(ErrorBox)
)(DecksOverviewRaw)

export default DecksOverview

export * from "./component"
export * from "./types"

