import {useState} from "react"
import {useTranslation} from "react-i18next"
import _ from "lodash"
import {ChangeListener, TransformerMap, Updater} from "./useFormState"

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


export type ValidatedFormState<T> = {
    [P in keyof T]: {
        value: T[P]
        set: Updater<T[P]>
        onChange: ChangeListener
        error?: string
    }
} & {valid: boolean}

type State<T> = {
    [P in keyof T]: {
        prop: string
        value: T[P]
        set: Updater<T[P]>
    }
}

export const useValidatedFormState = <T extends object = any>(defaults: T, validatorMap: ValidatorMap<T>, transformers: TransformerMap<T> = {}): ValidatedFormState<T> => {
    const keys = Object.keys(defaults)
    const state = keys.map(prop => {
        const [value, set] = useState(defaults[prop])
        return {prop, value, set}
    })
    const [errors, setErrors] = useState<ErrorMap<T>>({})
    const [valid, setValid] = useState<boolean>(true)

    const withChangeHandlers = state.map(({prop, value, set}) => {
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
            set(eventValue)
        }

        checkValid()

        return {
            prop,
            value,
            set,
            onChange
        }
    })

    const result: ValidatedFormState<T> | object = {valid}
    withChangeHandlers.forEach(({prop, value, set, onChange}) => {
        result[prop] = {
            value,
            set,
            onChange,
            error: errors[prop]
        }
    })

    return result as ValidatedFormState<T>
}

export const validate = <TProp, TState>(name: string, value: TProp, validators: Array<Validator<TProp, TState>>, state: State<TState>) => {
    const {t} = useTranslation()
    for(const validator of validators) {
        if(!validator.fun(value, state)) {
            return t(validator.message)
        }
    }
}
