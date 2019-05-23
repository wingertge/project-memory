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

import {useEffect, useState} from "react"
import * as React from "react"
import Helmet from "react-helmet"
import {useTranslation} from "react-i18next"
import {oc} from "ts-optchain"
import {
    Review,
    ReviewFields,
    useReviewsQuery,
    useSubmitReviewMutation
} from "../../../generated/graphql"
import ApolloErrorBox from "../../components/apollo/ApolloErrorBox"
import {useID, useNow, useUpdateNow} from "../../hooks"
import {randomElement} from "../../util"
import ReviewDisplay from "./ReviewDisplay"
import ReviewsFinished from "./ReviewsFinished"

type ReviewMap = Array<{
    review: Review
    correct: boolean
}>

export const Reviews = () => {
    const {t} = useTranslation()
    const id = useID()
    const now = useNow()
    const {data, loading, error} = useReviewsQuery({
        variables: {
            userId: id,
            limit: 100,
            filter: {
                nextReviewAt: {lte: now},
                box: {gt: 0}
            }
        }
    })
    const reviews = oc(data).user.reviewQueue([]) as Review[]
    const [completedReviews, setCompletedReviews] = useState<ReviewMap>([])
    const [isDone, setDone] = useState(false)
    const [currentReview, setCurrentReview] = useState<Review | undefined>(randomElement(reviews))
    const updateNow = useUpdateNow()
    const [submitReviewMutate, {loading: saving, error: mutationError}] = useSubmitReviewMutation()

    const submitReview = (testedField: ReviewFields, correct: boolean) => {
        submitReviewMutate({
            variables: {reviewId: currentReview!.id, field: testedField, correct},
            optimisticResponse: () => {
                const newReviewedFields = [...currentReview!.reviewedFields!, testedField]
                const done = newReviewedFields.length === 3 || newReviewedFields.length === 2 && !currentReview!.card!.pronunciation
                const isCorrect = !correct ? false : currentReview!.correct
                const response = {
                    __typename: "Mutation",
                    submitReview: {
                        __typename: "Review",
                        id: currentReview!.id,
                        box: currentReview!.box,
                        reviewedFields: newReviewedFields,
                        correct: isCorrect,
                        nextReviewAt: done ? new Date(8640000000000000) : currentReview!.nextReviewAt
                    }
                }
                const newReviews = [...reviews.filter(review => review.id !== currentReview!.id)]
                if (!done) newReviews.push({
                    ...response.submitReview,
                    card: currentReview!.card
                } as any)
                else setCompletedReviews([...completedReviews, {review: currentReview!, correct: isCorrect!}])
                if(newReviews.length === 0) {
                    exit()
                    return response as any
                }
                setCurrentReview(randomElement(newReviews))
                return response as any
            }
        })
        updateNow()
    }

    const exit = () => {
        updateNow().then(() => setDone(true))
    }

    useEffect(() => setCurrentReview(randomElement(reviews)), [loading])

    if(error) return <ApolloErrorBox error={error} />
    if(loading) return null

    return (
        <>
            <Helmet>
                <title>{t("Reviews - Project Memory")}</title>
            </Helmet>
            {mutationError && <ApolloErrorBox error={mutationError} />}
            {currentReview && !isDone &&
            <ReviewDisplay review={currentReview} submitDisabled={saving} onSubmit={submitReview}
                           onExit={exit}/>}
            {isDone && <ReviewsFinished reviews={Object.values(completedReviews)}/>}
        </>
    )
}

export default Reviews
