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

/* tslint:disable:prefer-const */
import {useState} from "react"
import * as React from "react"
import Helmet from "react-helmet"
import {useTranslation} from "react-i18next"
import {
    Review,
    ReviewFields, ReviewsCountDocument,
    useSubmitReviewMutation
} from "../../../generated/graphql"
import {useID} from "../../hooks"
import ReviewDisplay from "../Reviews/ReviewDisplay"

interface PropTypes {
    reviews: Review[]
    onQuizFinished: () => void
}

export const LessonQuiz = ({reviews, onQuizFinished}: PropTypes) => {
    const {t} = useTranslation()
    let [finishedReviews, setFinishedReviews] = useState<Review[]>([])
    let [remainingReviews, setRemainingReviews] = useState(reviews)
    let [currentReview, setCurrentReview] = useState(randomElement(remainingReviews))
    const [submitReviewMutate] = useSubmitReviewMutation()
    const userId = useID()

    const submitReview = (testedField: ReviewFields, correct: boolean) => {
        if(correct) {
            currentReview = {
                ...currentReview,
                reviewedFields: [...currentReview.reviewedFields!, testedField]
            }
            if(currentReview.reviewedFields!.length === 3 || currentReview.reviewedFields!.length === 2 && !currentReview.card.pronunciation) {
                setFinishedReviews([...finishedReviews, currentReview])
                remainingReviews = remainingReviews.filter(review => review.id !== currentReview.id)
            } else {
                remainingReviews = [...remainingReviews.filter(review => review.id !== currentReview.id), currentReview]
            }
            setRemainingReviews(remainingReviews)
        }
        if(remainingReviews.length === 0) {
            finishedReviews = [...finishedReviews, currentReview]
            finishedReviews.forEach(review => {
                review.reviewedFields!.forEach(field => {
                    const id = review.id
                    submitReviewMutate({
                        variables: {reviewId: id, field: field!, correct: true},
                        refetchQueries: [{query: ReviewsCountDocument, variables: {userId, filter: {box: {eq: 0}}}}]
                    }).then(onQuizFinished)
                })
            })
            onQuizFinished()
        } else setCurrentReview(randomElement(remainingReviews))
    }

    return (
        <>
            <Helmet>
                <title>{t("Review Lessons - Project Memory")}</title>
            </Helmet>
            <ReviewDisplay review={currentReview} onSubmit={submitReview} exitDisabled />
        </>
    )
}

function randomElement<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)]
}

export default LessonQuiz
