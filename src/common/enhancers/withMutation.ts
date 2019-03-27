import {ApolloError} from "apollo-client"
import {ErrorLink} from "apollo-link-error"
import {DocumentNode} from "graphql"
import {MutationFn} from "react-apollo"
import * as ReactApollo from "react-apollo"
import {graphql} from "react-apollo"
import {compose, mapper, withHandlers} from "recompose"
import {oc} from "ts-optchain"
import {withState} from "./index"
import ErrorHandler = ErrorLink.ErrorHandler

interface MutationOptions<TProps, TMutation, TVariables> {
    ignoreErrors?: boolean
    variables?: Partial<TVariables>
    optimisticResponse?: TMutation | mapper<TProps, TMutation>
}

export type Props<TQuery, TVariables, TChildProps = any> = Partial<ReactApollo.DataProps<TQuery, TVariables>> & TChildProps

interface ExtraMutationData {
    error?: ApolloError
    saving: boolean
}

type MutationData<TMutation> = ExtraMutationData & Partial<TMutation>

export interface MutationProps<TMutation, TVariables> {
    updateMutationData: (state: MutationData<TMutation>) => MutationData<TMutation>
    mutationData: MutationData<TMutation>
    mutate: MutationFn<TMutation, TVariables>
}

export type MutateFn<TMutation, TVariables> = (variables: TVariables) => void

export interface WithMutation {
    submitMutation: () => void
}

export type SuccessHandler<TProps, TMutation> = (props: TProps, result: TMutation) => void
export type FailureHandler<TProps> = (props: TProps, error: ApolloError) => void

export const withMutation = <TProps, TMutation, TVariables = {}, TChildProps = {}>(
    mutation: DocumentNode,
    variables: keyof TProps | mapper<TProps, TVariables>,
    onSuccess?: keyof TProps | SuccessHandler<TProps, TMutation>,
    onError?: keyof TProps | FailureHandler<TProps>,
    options: MutationOptions<TProps, TMutation, TVariables> = {}
    ) => {
    const vars = oc(options).variables({} as any)
    const mutationOptions: ReactApollo.OperationOption<TProps, TMutation, TVariables, Props<TMutation, TVariables>> = {
        options: (props: TProps & any) => {
            return ({
                errorPolicy: options.ignoreErrors ? "ignore" : "none",
                optimisticResponse: typeof options.optimisticResponse === "function" ? (options.optimisticResponse as mapper<TProps, TMutation>)(props) : options.optimisticResponse,
                onCompleted: onSuccess ? (data: TMutation) => {
                    props.updateMutationData({
                        ...props.mutationData,
                        saving: false
                    })
                    if(typeof onSuccess === "function") {
                        return (onSuccess as SuccessHandler<TProps, TMutation>)(props, data)
                    } else {
                        return (props[onSuccess] as any)(data)
                    }
                } : (data: TMutation) => props.updateMutationData({
                    ...props.mutationData,
                    ...data,
                    saving: false
                }),
                onError: onError ? (error: ApolloError) => {
                    props.updateMutationData({
                        ...props.mutationData,
                        saving: false
                    })
                    if(typeof onError === "function") {
                        return (onError as FailureHandler<TProps>)(props, error)
                    } else {
                        return (props[onError] as any)(error)
                    }
                } : (error: ApolloError) => props.updateMutationData({
                    ...props.mutationData,
                    error,
                    saving: false
                }),
            })
        }
    }

    const enhancers = [
        withState<TProps & MutationProps<TMutation, TVariables>, MutationData<TMutation>>("mutationData", "updateMutationData", {
            loading: false
        } as any),
        graphql<TProps, TMutation, TVariables, Props<TMutation, TVariables, TChildProps>>(mutation, mutationOptions)
    ]

    if(typeof variables === "function") {
        // @ts-ignore
        enhancers.push(withHandlers({
            submitMutation: (props: TProps & MutationProps<TMutation, TVariables>) => () => {
                const {mutate, mutationData, updateMutationData} = props
                const mappedVariables = variables(props)
                updateMutationData({
                    ...mutationData,
                    saving: true
                })
                return mutate({
                    variables: {...vars, ...mappedVariables} as TVariables
                })
            }
        }))
    } else {
        // @ts-ignore
        enhancers.push(withHandlers<TProps & MutationProps<TMutation, TVariables>, Partial<TProps & MutationProps<TMutation, TVariables>>>({
            [variables]: ({mutate, mutationData, updateMutationData}: TProps & MutationProps<TMutation, TVariables>) => (value: Partial<TVariables>) => {
                updateMutationData({
                    ...mutationData,
                    saving: true
                })
                return mutate({
                    variables: {...vars, ...value} as TVariables
                })
            }
        }))
    }

    return compose(
        ...enhancers
    )
}
