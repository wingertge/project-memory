import {Dispatch, SetStateAction, useEffect, useState} from "react"
import {oc} from "ts-optchain"
import {useCurrentUserIdQuery, useProfileQuery, User} from "../../generated/graphql"

export const useUser = (id?: string) => {
    id = id || useID()
    const {data} = useProfileQuery({
        variables: {
            id
        },
        errorPolicy: "ignore"
    })
    return oc(data).user() as User
}

export const useID = () => {
    const {data} = useCurrentUserIdQuery({errorPolicy: "ignore"})
    return oc(data).currentUserID("")
}

export const useStateOnChange = <T>(setter: () => T, changeProps: any[]): [T, Dispatch<SetStateAction<T>>] => {
    const [value, setValue] = useState<T>(setter())

    useEffect(
        () => setValue(setter()),
        changeProps
    )

    return [value, setValue]
}

export * from "./useDialog"
export * from "./useFormState"
export * from "./useValidatedFormState"
export * from "./useToast"