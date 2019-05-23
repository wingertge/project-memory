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
import Helmet from "react-helmet"
import {useTranslation} from "react-i18next"
import {oc} from "ts-optchain"
import {Post, useAggregatedFeedQuery} from "../../../generated/graphql"
import ApolloErrorBox from "../../components/apollo/ApolloErrorBox"
import Feed from "../../components/common/Feed"
import {TimedCircularProgress} from "../../components/apollo/TimedCircularProgress"
import {useID} from "../../hooks"

export const AggregatedFeed = () => {
    const {t} = useTranslation()
    const userId = useID()

    const {data, loading, error, fetchMore} = useAggregatedFeedQuery({
        variables: {
            userId,
            limit: 10,
            sort: {
                sortBy: "createdAt",
                sortDirection: "desc"
            }
        }
    })

    const onFetchMore = () => {
        fetchMore({
            variables: {
                offset: oc(data).user.subscriptionFeed.length(0)
            },
            updateQuery: (prev, {fetchMoreResult}) => {
                if(!fetchMoreResult || !fetchMoreResult.user || !fetchMoreResult.user.subscriptionFeed) return prev
                return {
                    ...prev,
                    user: {
                        ...prev.user!,
                        subscriptionFeed: [...prev!.user!.subscriptionFeed!, ...fetchMoreResult.user.subscriptionFeed]
                    }
                }
            }
        })
    }

    if(loading) return <TimedCircularProgress />
    if(error) return <ApolloErrorBox error={error} />

    const feed = data!.user!.subscriptionFeed as Post[]

    return (
        <>
            <Helmet>
                <title>{t("Feed - Project Memory")}</title>
            </Helmet>
            <Feed feed={feed} fetching={loading} onFetchMore={onFetchMore} />
        </>
    )
}

export default AggregatedFeed
