import {Dispatch, SetStateAction, useState} from "react"
import {useTranslation} from "react-i18next"
import _ from "lodash"

export type Updater<T> = Dispatch<SetStateAction<T>>
export type ChangeListener = (event: any) => void
export type Transformer<T> = (value: T) => T

export interface Validator<TProp, TProps> {
    fun: (value: TProp, context: State<TProps>) => boolean
    message: string
}

export type ValidatorMap<TProps> = {
    [P in keyof TProps]?: Array<Validator<TProps[P], TProps>>
}

export type ErrorMap<TProps> = {
    [Prop in keyof TProps]?: string
}


export type FormState<T> = {
    [P in keyof T]: {
        value: P
        updater: Updater<P>
        onChange: ChangeListener
        error?: string
    }
} & {valid: boolean}

export type TransformerMap<T> = {
    [TProp in keyof T]?: Transformer<TProp>
}

type State<T> = {
    [P in keyof T]: {
        prop: string
        value: P
        updater: Updater<P>
    }
}

export const useValidatedFormState = <T extends object = any>(defaults: T, validatorMap: ValidatorMap<T>, transformers: TransformerMap<T> = {}): FormState<T> => {
    const keys = Object.keys(defaults)
    const state = keys.map(prop => {
        const [value, updater] = useState(defaults[prop])
        return {prop, value, updater}
    })
    const [errors, setErrors] = useState<ErrorMap<T>>({})
    const [valid, setValid] = useState<boolean>(true)

    const withChangeHandlers = state.map(({prop, value, updater}) => {
        const checkValid = () => {
            const error = validate(prop, value, validatorMap[prop] || [], state)
            if(error !== errors[prop]) {
                if(!error) delete errors[prop]
                else errors[prop] = error
                setErrors(errors)
                setValid(_.isEmpty(errors))
            }
        }

        const onChange = event => {
            checkValid()
            const transformer = transformers[prop] || (val => val)
            const eventValue = transformer(event.target.value)
            updater(eventValue)
        }

        checkValid()

        return {
            prop,
            value,
            updater,
            onChange
        }
    })

    const result: FormState<T> | object = {valid}
    withChangeHandlers.forEach(({prop, value, updater, onChange}) => {
        result[prop] = {
            value,
            updater,
            onChange,
            error: errors[prop]
        }
    })

    return result as FormState<T>
}

export const validate = <TProp, TState>(name: string, value: TProp, validators: Array<Validator<TProp, TState>>, state: State<TState>) => {
    const {t} = useTranslation()
    for(const validator of validators) {
        if(!validator.fun(value, state)) {
            return t(validator.message)
        }
    }
}
