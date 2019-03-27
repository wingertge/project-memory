import {CircularProgress, withStyles} from "@material-ui/core"
import {withTranslation} from "react-i18next"
import {compose, pure} from "recompose"
import {oc} from "ts-optchain"
import {UpdateDeckDocument, withGetDeckDetails} from "../../../generated/graphql"
import {
    renderOnError,
    renderWhileLoading,
    withRouteProps,
    withValidatedFormState,
    withDialog,
    withMutation, withToast, withErrorBox
} from "../../enhancers"
import ErrorBox from "../../components/common/ErrorBox"
import EditCardForm, {PropTypes as CardFormPropTypes} from "./EditCardForm"
import {DeckDetailsRaw} from "./component"
import {styles} from "./styles"
import {Form, GraphQLTypes, Props} from "./types"
import {deckPropsValidators} from "./validation"
import {UpdateDeckMutation as Mutation, UpdateDeckMutationVariables as MutationVariables} from "../../../generated/graphql"

export * from "./component"

export default compose<Props, {}>(
    pure,
    withStyles(styles),
    withTranslation(),
    withRouteProps<Props>([id => id, "id"], [page => parseInt(page || "0", 10), "page"], [sortDir => sortDir || "asc", "sortDirection"], [sortBy => sortBy || "meaning", "sortBy"]),
    withDialog<Props, CardFormPropTypes>(EditCardForm),
    withGetDeckDetails<Props, GraphQLTypes>({
        options: ({id}) => ({
            variables: {
                deckID: id
            }
        }),
        props: ({data}) => ({
            data,
            deck: data!.deck
        })
    }),
    withValidatedFormState<Form, Props>(({deck}) => ({
        name: oc(deck).name("")
    }), deckPropsValidators),
    withToast("Successfully saved profile"),
    withMutation<Props, Mutation, MutationVariables>(UpdateDeckDocument,  ({id, name}) => ({id, deckInput: {name}}), ({openToast}) => openToast()),
    withErrorBox<Props>("submitMutation", "mutationData"),
    renderWhileLoading(CircularProgress),
    renderOnError(ErrorBox),
)(DeckDetailsRaw)
