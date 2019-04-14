import {compose, withProps, mapper} from "recompose"
import {withState} from "./index"

export type ValidatorMap<TProps> = {
    [P in keyof TProps]?: Array<Validator<TProps[P], TProps>>
}

export type ValidatorMapper<TProps> = (props: TProps) => ValidatorMap<TProps>

export interface Validator<TProp, TProps = {}> {
    fun: (value: TProp, context: TProps) => boolean
    message: string
}

export type ValidateOptions<TProps> = {
    [Prop in keyof TProps]?: TProps[Prop]
}

export type ErrorMap<TProps> = {
    [Prop in keyof TProps]?: string
}

export interface FormWithErrors<TForm> {
    errors: ErrorMap<TForm>
    updateErrors: (state: ErrorMap<TForm>) => ErrorMap<TForm>
    validate: ValidatorFn<TForm>
}

export type ValidatorFn<TProps> = (props: TProps, options: ValidateOptions<TProps>) => void

export const eventHandlerWithValidation = <TProps extends FormWithErrors<TProps>>(propName: keyof TProps, updateHandler: keyof TProps, transformer?: mapper<TProps, (value: any) => any>) => (props: TProps) => {
    return event => {
        (props[updateHandler] as any)(transformer ? transformer(props)(event.target.value) : event.target.value)
        props.validate(props, {[propName]: event.target.value} as any)
    }
}

export function withValidation<TProps extends FormWithErrors<TProps>>(validators: ValidatorMap<TProps> | ValidatorMapper<TProps>) {
    function validate(props: TProps, options: ValidateOptions<TProps>) {
        const errors = props.errors || {}
        const validatorObj = typeof validators === "function" ? validators(props) : validators
        const t = (props as any).t
        Object.keys(options).forEach(prop => {
            const propValidators: Array<Validator<any>> = validatorObj[prop]
            if(!propValidators) return
            for (const validator of propValidators) {
                if(!validator.fun(options[prop], props)) {
                    errors[prop] = t ? t(validator.message) : validator.message
                    break
                } else {
                    delete errors[prop]
                }
            }
        })
        props.updateErrors(errors)
    }
    return compose(
        withState("errors", "updateErrors", {}),
        withProps<{validate: ValidatorFn<TProps>}, TProps>({
            validate
        })
    )
}
