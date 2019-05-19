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
