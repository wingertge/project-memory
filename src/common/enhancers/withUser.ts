/* tslint:disable:no-shadowed-variable */
import {compose, mapper} from "recompose"
import {oc} from "ts-optchain"
import {
    GetProfileProps,
    User,
    withGetCurrentUserId,
    withGetProfile
} from "../../generated/graphql"

export interface WithUser extends GetProfileProps {
    user: User
}

export const withID = <TProps = {}>(idName: keyof TProps | string = "id") => withGetCurrentUserId({
    props: ({data}) => ({
        [idName]: oc(data).currentUserID()
    }),
    options: {errorPolicy: "ignore"}
})

export const withUser = <TProps = WithUser>(id?: string | mapper<TProps, string>, propName: keyof TProps | string = "user") => {
    let idValue: any = id
    if(!idValue)
        idValue = ({id}: {id: string}) => id
    const gql = withGetProfile({
        props: ({data}) => ({
            data,
            [propName]: oc(data).user()
        }),
        options: (props: TProps) => ({
            errorPolicy: "ignore",
            variables: {
                id: typeof idValue === "function" ? idValue(props) : idValue
            }
        })
    })
    if(!id) {
        return compose(
            withID(),
            gql
        )
    } else {
        return gql
    }
}
