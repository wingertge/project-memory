import * as React from "react"
import ReviewsFinished from "./Reviews/ReviewsFinished"

const reviews = [...Array(40).keys()].map(index => ({
    correct: Math.random() > 0.5,
    review: {
        card: {
            meaning: `bla bla bla some meaning ${index}`
        }
    }
}))

const TestBed = () => <ReviewsFinished reviews={reviews as any} />

export default TestBed
