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
