import * as React from "react"
import {compose} from "recompose"
import {
    Review,
    ReviewFields,
    SubmitReviewDocument,
    SubmitReviewMutation,
    SubmitReviewMutationVariables
} from "../../../generated/graphql"
import {withHandlers, WithMutation, withMutation, withState} from "../../enhancers"
import ReviewDisplay from "../Reviews/ReviewDisplay"

interface PropTypes {
    reviews: Review[]
    onQuizFinished: () => void
}

interface StateTypes {
    finishedReviews: Review[]
    remainingReviews: Review[]
    currentReview: Review
}

interface UpdaterTypes {
    updateFinishedReviews: (state: Review[]) => void
    updateRemainingReviews: (state: Review[]) => void
    updateCurrentReview: (state: Review) => void
}

interface HandlerTypes {
    submitReview: (testedField: ReviewFields, correct: boolean) => void
}

type Props = PropTypes & StateTypes & HandlerTypes & UpdaterTypes & WithMutation

export const LessonQuizRaw = ({currentReview, submitReview}: Props) => (
    <ReviewDisplay review={currentReview} onSubmit={submitReview} exitDisabled />
)

function randomElement<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)]
}

export default compose<Props, PropTypes>(
    withState<Props, Review[]>("finishedReviews", "updateFinishedReviews", []),
    withState<Props, Review[]>("remainingReviews", "updateRemainingReviews", ({reviews}) => reviews),
    withState<Props, Review>("currentReview", "updateCurrentReview", ({remainingReviews}) => randomElement(remainingReviews)),
    withMutation<Props, SubmitReviewMutation, SubmitReviewMutationVariables>(SubmitReviewDocument, () => (review, field) => ({
        reviewId: review.id,
        field,
        correct: true
    }), ({onQuizFinished}) => onQuizFinished()),
    withHandlers<Props>({
        submitReview: ({currentReview, updateCurrentReview, remainingReviews, updateRemainingReviews, finishedReviews, updateFinishedReviews, submitMutation, onQuizFinished}) => (testedField, correct) => {
            if(correct) {
                currentReview = {
                    ...currentReview,
                    reviewedFields: [...currentReview.reviewedFields!, testedField]
                }
                if(currentReview.reviewedFields!.length === 3 || currentReview.reviewedFields!.length === 2 && !currentReview.card.pronunciation) {
                    updateFinishedReviews([...finishedReviews, currentReview])
                    remainingReviews = remainingReviews.filter(review => review.id !== currentReview.id)
                } else {
                    remainingReviews = [...remainingReviews.filter(review => review.id !== currentReview.id), currentReview]
                }
                updateRemainingReviews(remainingReviews)
            }
            if(remainingReviews.length === 0) {
                finishedReviews = [...finishedReviews, currentReview]
                finishedReviews.forEach(review => {
                    review.reviewedFields!.forEach(field => {
                        submitMutation(review, field)
                    })
                })
                onQuizFinished()
            } else updateCurrentReview(randomElement(remainingReviews))
        }
    })
)(LessonQuizRaw)
