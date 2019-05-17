import {Dispatch, SetStateAction, useEffect, useRef, useState} from "react"
import {oc} from "ts-optchain"
import {
    ReviewsCountDocument,
    useCurrentUserIdQuery, useNowQuery,
    useProfileQuery,
    User,
    useUpdateNowMutation
} from "../../generated/graphql"

export const useUser = (id?: string) => {
    id = id || useID()
    const currentUserId = useID()
    const {data} = useProfileQuery({
        variables: {
            id,
            currentUserId
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

export const useNow = (): Date => {
    const {data} = useNowQuery()
    return new Date(data!.now)
}

export const useUpdateNow = () => {
    const userId = useID()
    return useUpdateNowMutation({
        refetchQueries: [
            {query: ReviewsCountDocument, variables: {userId, filter: {}}},
            "Reviews"
        ]
    })[0]
}

export const usePrevious = <T>(value: T): T => {
    const ref = useRef<T>()
    useEffect(() => {
        ref.current = value
    })
    return ref.current!
}

export * from "./useDialog"
export * from "./useFormState"
export * from "./useValidatedFormState"
export * from "./useToast"
export * from "./mutations"
