import {ApolloError} from "apollo-client"
import {useState} from "react"
import * as React from "react"
import {oc} from "ts-optchain"
import {
    Review,
    ReviewFields,
    useReviewsQuery,
    useSubmitReviewMutation
} from "../../../generated/graphql"
import ApolloErrorBox from "../../components/common/ApolloErrorBox"
import {useID, useNow, useUpdateNow} from "../../hooks"
import {randomElement} from "../../util"
import ReviewDisplay from "./ReviewDisplay"
import ReviewsFinished from "./ReviewsFinished"

type ReviewMap = Array<{
    review: Review
    correct: boolean
}>

export const Reviews = () => {
    const id = useID()
    const now = useNow()
    const {data, loading, error} = useReviewsQuery({
        variables: {
            userId: id,
            filter: {
                limit: 100,
                toBeReviewedBy: now
            }
        }
    })
    const reviews = oc(data).user.reviewQueue([]) as Review[]
    const [completedReviews, setCompletedReviews] = useState<ReviewMap>([])
    const [isDone, setDone] = useState(false)
    const [currentReview, setCurrentReview] = useState<Review | undefined>(randomElement(reviews))
    const [mutationError, setMutationError] = useState<ApolloError | undefined>(undefined)
    const [saving, setSaving] = useState(false)
    const updateNow = useUpdateNow()
    const submitReviewMutate = useSubmitReviewMutation()

    const submitReview = (testedField: ReviewFields, correct: boolean) => {
        setSaving(true)
        updateNow()
        submitReviewMutate({
            variables: {reviewId: currentReview!.id, field: testedField, correct},
            optimisticResponse: () => {
                const newReviewedFields = [...currentReview!.reviewedFields!, testedField]
                const done = currentReview!.reviewedFields!.length === 3 || currentReview!.reviewedFields!.length === 2 && !currentReview!.card!.pronunciation
                const isCorrect = !correct ? false : currentReview!.correct
                const response = {
                    __typename: "Mutation",
                    submitReview: {
                        __typename: "Review",
                        id: currentReview!.id,
                        box: currentReview!.box,
                        reviewedFields: newReviewedFields,
                        correct: isCorrect,
                        nextReviewAt: done ? new Date(8640000000000000) : new Date()
                    }
                }
                const newReviews = [...reviews.filter(review => review.id === currentReview!.id)]
                if (!done) newReviews.push({
                    ...response.submitReview,
                    card: currentReview!.card
                } as any)
                else setCompletedReviews([...completedReviews, {review: currentReview!, correct: isCorrect!}])
                setCurrentReview(randomElement(newReviews))
                return response as any
            }
        }).then(({errors}) => {
            setSaving(false)
            setMutationError((errors && errors.length > 0 && errors[0] as any) || undefined)
        })
    }

    if(error) return <ApolloErrorBox error={error} />
    if(loading) return null

    return (
        <>
            {mutationError && <ApolloErrorBox error={mutationError} />}
            {currentReview && !isDone &&
            <ReviewDisplay review={currentReview} submitDisabled={saving} onSubmit={submitReview}
                           onExit={() => setDone(true)}/>}
            {(!currentReview && id || isDone) && <ReviewsFinished reviews={Object.values(completedReviews)}/>}
        </>
    )
}

export default Reviews
