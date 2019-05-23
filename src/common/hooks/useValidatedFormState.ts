/*
The following is the license for the Project Memory Frontend, a frontend for the Project Memory web app.
Copyright (C) 2019  Genna Wingert

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

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

interface Options<T> {
    transformers?: TransformerMap<T>
    enableInitialValidation?: boolean
}

export const useValidatedFormState = <T extends object = any>(defaults: T, validatorMap: ValidatorMap<T>, options: Options<T> = {}): ValidatedFormState<T> => {
    const {enableInitialValidation = true, transformers = {}} = options
    const keys = Object.keys(defaults)
    const state = keys.map(prop => {
        const [value, set] = useState(defaults[prop])
        return {prop, value, set}
    })
    const [errors, setErrors] = useState<ErrorMap<T>>({})
    const [valid, setValid] = useState<boolean>(true)
    const {t} = useTranslation()

    const withChangeHandlers = state.map(({prop, value, set}) => {
        const checkValid = (val: string) => {
            const error = validate(prop, val, validatorMap[prop] || [], state, t)
            if(error !== errors[prop]) {
                if(!error) delete errors[prop]
                else errors[prop] = error
                setErrors(errors)
                setValid(_.isEmpty(errors))
            }
        }

        const onChange = event => {
            const transformer = transformers[prop] || (val => val)
            const eventValue = transformer(event.target.value)
            checkValid(eventValue)
            set(eventValue)
        }

        if(enableInitialValidation) checkValid(value)

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

export const validate = <TProp, TState>(name: string, value: TProp, validators: Array<Validator<TProp, TState>>, state: State<TState>, t: (val: string) => string) => {
    if(typeof value === "undefined") value = "" as any
    for(const validator of validators) {
        if(!validator.fun(value, state)) {
            return t(validator.message)
        }
    }
}
