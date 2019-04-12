import {CircularProgress} from "@material-ui/core"
import * as React from "react"
import {compose, lifecycle, pure} from "recompose"
import {oc} from "ts-optchain"
import {
    Review, ReviewFields,
    SubmitReviewDocument,
    SubmitReviewMutation,
    SubmitReviewMutationVariables,
    withReviews
} from "../../../generated/graphql"
import ErrorBox from "../../components/common/ErrorBox"
import {
    renderOnError,
    renderWhileLoading,
    withErrorBox, withHandlers,
    WithID,
    withID,
    WithMutation,
    withMutation,
    withState
} from "../../enhancers"
import {randomElement} from "../../util"
import ReviewDisplay from "./ReviewDisplay"
import ReviewsFinished from "./ReviewsFinished"

interface GQLTypes {
    reviews: Review[]
    reviewsData: any
}

interface ExtraTypes {
    now: Date
}

interface ReviewMap {
    [ID: string]: {
        review: Review
        correct: boolean
    }
}

interface StateTypes {
    currentReview?: Review
    completedReviews: ReviewMap
    isDone: boolean
}

interface UpdaterTypes {
    setCurrentReview: (value?: Review) => void
    setCompletedReviews: (value: (current: ReviewMap) => ReviewMap) => void
    setDone: (value: boolean) => void
}

interface HandlerTypes {
    onExit: () => void
}

type Props = GQLTypes & WithID & WithMutation & StateTypes & UpdaterTypes & HandlerTypes & ExtraTypes

export const ReviewsRaw = ({currentReview, mutationData, submitMutation, id, completedReviews, isDone, onExit}: Props) => (
    <>
        {currentReview && !isDone && <ReviewDisplay review={currentReview} submitDisabled={mutationData.saving} onSubmit={submitMutation} onExit={onExit} />}
        {(!currentReview && id || isDone) && <ReviewsFinished reviews={Object.values(completedReviews)} />}
    </>
)

let now = new Date()

export default compose<Props, {}>(
    pure,
    withID(),
    withState<Props, ReviewMap>("completedReviews", "setCompletedReviews", {}),
    withState<Props, boolean>("isDone", "setDone", false),
    //withPropsOnChange<Partial<Props>, Props>((current, next) => !current.now || current.now.getTime() + 60000 < next.now.getTime(), () => ({now: new Date()})),
    withReviews<Props, GQLTypes>({
        skip: ({id}) => !id,
        options: ({id}) => ({
            variables: {
                userId: id,
                filter: {
                    limit: 100,
                    toBeReviewedBy: now
                }
            }
        }),
        props: ({data}) => ({
            reviewsData: data,
            reviews: oc(data).user.reviewQueue([]) as Review[]
        })
    }),
    renderWhileLoading(CircularProgress, "reviewsData"),
    renderOnError(ErrorBox),
    withState<Props, Review | undefined>("currentReview", "setCurrentReview", ({reviews}) => randomElement(reviews)),
    withMutation<Props, SubmitReviewMutation, SubmitReviewMutationVariables>(
        SubmitReviewDocument,
        ({currentReview}) => (testedField: ReviewFields, correct: boolean) => ({reviewId: currentReview!.id, field: testedField, correct}),
        ({data, setCompletedReviews, currentReview, setCurrentReview, reviews}, result) => {
            setCompletedReviews(current => {
                current[currentReview!.id] = {
                    review: currentReview!,
                    correct: oc(result).submitReview.correct(true)!
                }
                return current
            })
        },
        undefined,
        {
            optimisticResponse: ({currentReview, reviews, setCurrentReview}) => (testedField: ReviewFields, correct: boolean) => {
                const newReviewedFields = [...currentReview!.reviewedFields!, testedField]
                const isDone = currentReview!.reviewedFields!.length === 3 || currentReview!.reviewedFields!.length === 2 && !currentReview!.card!.pronunciation
                const response = {
                    __typename: "Mutation",
                    submitReview: {
                        __typename: "Review",
                        id: currentReview!.id,
                        box: currentReview!.box,
                        reviewedFields: newReviewedFields,
                        correct: !correct ? false : currentReview!.correct,
                        nextReviewAt: isDone ? new Date(8640000000000000) : new Date()
                    }
                }
                const newReviews = [...reviews.filter(review => review.id === currentReview!.id)]
                if(!isDone) newReviews.push({
                    ...response.submitReview,
                    card: currentReview!.card
                } as any)
                setCurrentReview(randomElement(newReviews))
                return response as any
            }
        }
    ),
    withHandlers<Props>({
        onExit: ({setDone}) => () => setDone(true)
    }),
    withErrorBox<Props>("submitMutation", "mutationData"),
    lifecycle({
        componentDidMount() {
            now = new Date()
        }
    })
)(ReviewsRaw)
