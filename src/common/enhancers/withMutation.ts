import {ApolloError} from "apollo-client"
import {DocumentNode} from "graphql"
import {MutationFn} from "react-apollo"
import * as ReactApollo from "react-apollo"
import {graphql} from "react-apollo"
import {compose, withHandlers} from "recompose"
import {oc} from "ts-optchain"
import {UpdateProfile} from "../../generated-models"

interface MutationOptions<TProps, TQuery, TVariables> {
    ignoreErrors?: boolean
    variables?: Partial<TVariables>
    optimistic?: boolean
}

export type Props<TQuery, TVariables, TChildProps = any> = Partial<ReactApollo.DataProps<TQuery, TVariables>> & TChildProps

export interface MutationProps<TMutation, TVariables> {
    apolloError: ApolloError | undefined
    apolloResult: TMutation | undefined
    updateApolloError: (state: ApolloError | undefined) => ApolloError | undefined
    updateApolloResult: (state: TMutation | undefined) => TMutation | undefined
    loading: boolean
    mutate: (data: TVariables) => void
}

export const withMutation = <TProps extends MutationProps<TMutation, TVariables>, TMutation, TVariables = {}, TChildProps = {}>(
    mutation: DocumentNode,
    submitName: keyof TProps,
    onSuccess: keyof TProps | undefined = "updateApolloResult",
    onError: keyof TProps | undefined = "updateApolloError",
    options: MutationOptions<TProps, TMutation, TVariables> = {}
    ) => {
    const vars = oc(options).variables({} as any)
    const mutationOptions: ReactApollo.OperationOption<TProps, TMutation, TVariables, Props<TMutation, TVariables>> = {
        options: (props: TProps) => {
            return ({
                errorPolicy: oc(options).ignoreErrors(true) ? "ignore" : "none",
                optimisticResponse: oc(options).optimistic(false) ? {} : undefined,
                onCompleted: onSuccess && props[onSuccess],
                onError: onError && props[onError],
            })
        },
        props: props => ({
            loading: (props.data && props.data.loading) || false,
            mutate: props.mutate,
            data: props.data
        })
    }

    return compose(
        graphql<TProps, TMutation, TVariables, Props<TMutation, TVariables, TChildProps>>(mutation, mutationOptions),
        withHandlers({
            [submitName]: ({mutate}: {mutate: MutationFn<TMutation, TVariables>}) => (value: Partial<TVariables>) => mutate({
                variables: {...vars, ...value} as any
            })
        })
    )
}
