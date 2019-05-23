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
