import {CircularProgress} from "@material-ui/core"
import {ComponentType} from "react"
import {
    branch,
    compose,
    InferableComponentEnhancerWithProps,
    mapper, Omit,
    renderComponent,
    withHandlers,
    withProps,
    withState as withStateBase
} from "recompose"
import {oc} from "ts-optchain"
import {eventHandlerWithValidation, FormWithErrors, ValidatorMap, withValidation} from "./withValidation"

export const eventHandler = <TProps>(updateHandler: keyof TProps) => (props: TProps) => event => (props[updateHandler] as any)(event.target.value)

export function withState<TProps = {}, TState = string>(stateName: string, stateUpdaterName: string, initialState: TState | mapper<TProps, TState>) {
    return withStateBase<TProps, TState, string, string>(stateName, stateUpdaterName, initialState)
}

/**
 * Creates a form state HOC with the the corresponding updater and onChange functions. All properties specified in the default state will be mapped.
 * The naming of the generated methods is "update${Name}()" for updaters and "on${Name}Change()" for change handlers.
 * @param defaultState An object or mapper to create the default state.
 * The properties in the result are the form fields that should be created.
 * Note: When using a mapper, all props will be undefined the first time around so be careful with accessors.
 */
export const withFormState = <TFormProps, TProps>(defaultState: TFormProps | mapper<TProps, TFormProps>) => {
    const stateEnhancers: any[] = []
    const callbacks = {}
    const defaultIsStatic = typeof defaultState === "object"
    const defaultStateFun = defaultIsStatic ? undefined : defaultState as mapper<TProps, TFormProps>
    const keys = defaultIsStatic ? Object.keys(defaultState) : Object.keys(defaultStateFun!({} as TProps))
    keys.forEach(key => {
        const updater = `update${uppercaseFirstLetter(key)}`
        const handlerName = `on${uppercaseFirstLetter(key)}Change`
        const def = defaultIsStatic ? defaultState[key] : (props: TProps) => defaultStateFun!(props)[key]
        stateEnhancers.push(withState(key, updater, def))
        callbacks[handlerName] = eventHandler<TProps>(updater as any)
    })
    return compose(
        ...stateEnhancers,
        withHandlers(callbacks)
    )
}

/**
 * Creates a form state HOC with the the corresponding updater and onChange functions, as well as validation. All properties specified in the default state will be mapped.
 * The naming of the generated methods is "update${Name}()" for updaters and "on${Name}Change()" for change handlers.
 * @param defaultState An object or mapper to create the default state.
 * The properties in the result are the form fields that should be created.
 * Note: When using a mapper, all props will be undefined the first time around so be careful with accessors.
 * @param validators Validator Object
 */
export const withValidatedFormState = <TFormProps extends FormWithErrors<TFormProps>, TProps>(
    defaultState: Partial<Omit<TFormProps, keyof FormWithErrors<TFormProps>>> | mapper<TProps, Partial<Omit<TFormProps, keyof FormWithErrors<TFormProps>>>>,
    validators: ValidatorMap<TFormProps>
) => {
    const stateEnhancers: any[] = []
    const callbacks = {}
    const defaultIsStatic = typeof defaultState === "object"
    const defaultStateFun = defaultIsStatic ? undefined : defaultState as mapper<TProps, Partial<Omit<TFormProps, keyof FormWithErrors<TFormProps>>>>
    const keys = defaultIsStatic ? Object.keys(defaultState) : Object.keys(defaultStateFun!({} as TProps))
    keys.forEach(key => {
        const updater = `update${uppercaseFirstLetter(key)}`
        const handlerName = `on${uppercaseFirstLetter(key)}Change`
        const def = defaultIsStatic ? defaultState[key] : (props: TProps) => defaultStateFun!(props)[key]
        stateEnhancers.push(withState<TProps>(key, updater, def))
        callbacks[handlerName] = eventHandlerWithValidation<TFormProps>(key as any, updater as any)
    })
    return compose(
        withValidation(validators),
        ...stateEnhancers,
        withHandlers(callbacks)
    )
}

const uppercaseFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.substr(1)

export * from "./withValidation"
export * from "./withMutation"
export * from "./renderBranch"
export * from "./wrap"
export * from "./withToast"
