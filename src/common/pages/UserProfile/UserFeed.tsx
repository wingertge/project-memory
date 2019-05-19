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

    const {data, loading, error, fetchMore} = useFeedQuery({
        variables: {
            userId,
            currentUserId,
            limit: 10
        }
    })
    const feed = oc(data).user.feed([]) as Post[]
    const onFetchMore = () => {
        fetchMore({
            variables: {
                offset: feed.length
            },
            updateQuery: (prev, {fetchMoreResult}) => {
                if(!fetchMoreResult || !fetchMoreResult.user || !fetchMoreResult.user.feed) return prev
                return {
                    ...prev,
                    user: {
                        ...prev.user!,
                        feed: [...prev!.user!.feed!, ...fetchMoreResult.user.feed]
                    }
                }
            }
        })
    }

    if(error) return <ApolloErrorBox error={error} />
    if(loading) return <TimedCircularProgress />

    return <Feed feed={feed} isOwn={isOwn} fetching={loading} onFetchMore={onFetchMore} />
}

export default UserFeed
