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

export * from "./useDialog"
export * from "./useValidatedFormState"
export * from "./useToast"
