import {Dispatch, SetStateAction, useState} from "react"

export type Updater<T> = Dispatch<SetStateAction<T>>
export type ChangeListener = (event: any) => void
export type Transformer<T> = (value: T) => T

export type TransformerMap<T> = {
    [TProp in keyof T]?: Transformer<TProp>
}

export type FormState<T> = {
    [P in keyof T]: {
        value: T[P]
        set: Updater<T[P]>
        onChange: ChangeListener
    }
}

export const useFormState = <T extends object = any>(defaults: T, transformers: TransformerMap<T> = {}): FormState<T> => {
    const keys = Object.keys(defaults)
    const result = {}
    keys.forEach(prop => {
        const [value, set] = useState(defaults[prop])

        const onChange = event => {
            const transformer = transformers[prop] || (val => val)
            const eventValue = transformer(event.target.value)
            set(eventValue)
        }

        result[prop] = {value, set, onChange}
    })

    return result as FormState<T>
}
