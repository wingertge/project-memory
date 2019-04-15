/* tslint:disable:prefer-const */
import {useState} from "react"
import * as React from "react"
import {Review, ReviewFields, useSubmitReviewMutation} from "../../../generated/graphql"
import ReviewDisplay from "../Reviews/ReviewDisplay"

interface PropTypes {
    reviews: Review[]
    onQuizFinished: () => void
}

export const LessonQuiz = ({reviews, onQuizFinished}: PropTypes) => {
    let [finishedReviews, setFinishedReviews] = useState<Review[]>([])
    let [remainingReviews, setRemainingReviews] = useState(reviews)
    let [currentReview, setCurrentReview] = useState(randomElement(remainingReviews))
    const submitReviewMutate = ({id}: Review, field: ReviewFields) => useSubmitReviewMutation({variables: {reviewId: id, field, correct: true}})().then(onQuizFinished)

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
                    submitReviewMutate(review, field!)
                })
            })
            onQuizFinished()
        } else setCurrentReview(randomElement(remainingReviews))
    }

    return (
        <ReviewDisplay review={currentReview} onSubmit={submitReview} exitDisabled/>
    )
}

function randomElement<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)]
}

export default LessonQuiz
