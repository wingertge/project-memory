import * as React from "react"
import {oc} from "ts-optchain"
import {Post, useFeedQuery} from "../../../generated/graphql"
import ApolloErrorBox from "../../components/apollo/ApolloErrorBox"
import Feed from "../../components/common/Feed"
import {TimedCircularProgress} from "../../components/apollo/TimedCircularProgress"
import {useID} from "../../hooks"

interface PropTypes {
    isOwn?: boolean
    userId: string
}

export const UserFeed = ({isOwn, userId}: PropTypes) => {
    const currentUserId = useID()

    const {data, loading, error} = useFeedQuery({
        variables: {
            userId,
            currentUserId,
            filter: {
                limit: 20
            }
        }
    })
    const feed = oc(data).user.feed([]) as Post[]

    if(error) return <ApolloErrorBox error={error} />
    if(loading) return <TimedCircularProgress />

    return <Feed userId={userId} feed={feed} isOwn={isOwn} />
}

export default UserFeed
