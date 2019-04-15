import {Button, TextField, Theme, Typography} from "@material-ui/core"
import {createStyles, makeStyles} from "@material-ui/styles"
import {useState} from "react"
import * as React from "react"
import {useTranslation} from "react-i18next"
import {Review, ReviewFields} from "../../../generated/graphql"
import {useStateOnChange, useValidatedFormState} from "../../hooks"
import {notEmpty} from "../../util/validationUtils"

interface PropTypes {
    review: Review
    onSubmit: (testedField: ReviewFields, correct: boolean) => void
    submitDisabled?: boolean
    onExit?: () => void
    exitDisabled?: boolean
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    responseField: {
        width: "100%",
        margin: theme.spacing(0, 2, 0, 4)
    },
    review: {
        padding: theme.spacing(2),
        background: theme.palette.background.paper,
        marginTop: theme.spacing(-2)
    },
    shownValue: {
        marginBottom: theme.spacing(2)
    },
    button: {
        marginRight: theme.spacing(2)
    },
    nav: {
        display: "flex",
        flexDirection: "row"
    },
    spacer: {
        flexGrow: 1
    }
}))

export const ReviewDisplay = ({review, submitDisabled, onExit, exitDisabled, onSubmit}: PropTypes) => {
    const classes = useStyles()
    const {t} = useTranslation()
    const {response, valid} = useValidatedFormState({response: ""}, {response: [{fun: notEmpty, message: "Response can't be empty"}]})
    const [isWrong, setWrong] = useState(false)
    const [fieldToTest, setFieldToTest] = useStateOnChange(() => selectTestableField(review), [review])
    const fieldToShow = fieldToTest === "meaning" ? "translation" : fieldToTest === "pronunciation" ? "translation" : "meaning"

    const checkAnswer = () => {
        if(isWrong) {
            onSubmit(fieldToTest, false)
            setWrong(false)
            response.set("")
            setFieldToTest(selectTestableField(review))
            return
        }
        const correct = review.card[fieldToTest] === response.value
        if(correct) {
            onSubmit(fieldToTest, correct)
            response.set("")
        } else setWrong(true)
    }

    const onKeyPress = event => {
        if(event.key === "Enter" && valid) {
            event.preventDefault()
            checkAnswer()
        }
    }

    return (
        <div className={classes.review}>
            <Typography variant="h3" className={classes.shownValue}>{review.card[fieldToShow]}</Typography>
            <Typography variant="h6">{t(fieldToTest)}</Typography>
            <TextField
                variant="filled"
                inputProps={{style: {textAlign: "center", fontSize: "20pt", paddingTop: 10}}}
                value={response.value}
                onChange={response.onChange}
                onKeyPress={onKeyPress}
                error={!!response.error || isWrong}
                helperText={response.error}
                autoFocus className={classes.responseField}/>
            {isWrong && <Typography variant="h6"
                                    color="error">{t("Your answer was wrong. Correct answer: {{answer}}", {answer: review.card[fieldToTest]})}</Typography>}
            <div className={classes.nav}>
                <Button onClick={onExit!} variant="contained" disabled={exitDisabled}>{t("Exit")}</Button>
                <div className={classes.spacer}/>
                <Button onClick={checkAnswer} variant="contained" color="primary"
                        disabled={!valid || submitDisabled}>{t(isWrong ? "Next" : "Submit")}</Button>
            </div>
        </div>
    )
}

const selectTestableField = (review: Review) => {
    let testableFields: ReviewFields[] = review.card.pronunciation ? ["meaning", "pronunciation", "translation"] : ["meaning", "translation"]
    testableFields = testableFields.filter(field => !review.reviewedFields!.includes(field))
    return testableFields[Math.floor(Math.random() * testableFields.length)]
}

export default ReviewDisplay
