import * as React from "react"
import Helmet from "react-helmet"
import {useTranslation} from "react-i18next"
import {Post, useAggregatedFeedQuery} from "../../../generated/graphql"
import ApolloErrorBox from "../../components/apollo/ApolloErrorBox"
import Feed from "../../components/common/Feed"
import {TimedCircularProgress} from "../../components/apollo/TimedCircularProgress"
import {useID} from "../../hooks"

export const AggregatedFeed = () => {
    const {t} = useTranslation()
    const userId = useID()

    const {data, loading, error} = useAggregatedFeedQuery({
        variables: {
            userId,
            filter: {
                limit: 20,
                sortBy: "createdAt",
                sortDirection: "desc"
            }
        }
    })

    if(loading) return <TimedCircularProgress />
    if(error) return <ApolloErrorBox error={error} />

    const feed = data!.user!.subscriptionFeed as Post[]

    return (
        <>
            <Helmet>
                <title>{t("Feed - Project Memory")}</title>
            </Helmet>
            <Feed userId={userId} feed={feed} />
        </>
    )
}

export default AggregatedFeed
