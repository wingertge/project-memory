import {Button, TextField, Theme, Typography} from "@material-ui/core"
import {createStyles, makeStyles} from "@material-ui/styles"
import clsx from "clsx"
import Fuse from "fuse.js"
import {useState} from "react"
import * as React from "react"
import {useTranslation} from "react-i18next"
import {Review, ReviewFields} from "../../../generated/graphql"
import {useStateOnChange, useValidatedFormState} from "../../hooks"
//import {converter} from "../../language/converters"
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
        margin: theme.spacing(2, 0, 4, 0)
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
    },
    useIme: {
        imeMode: "active",
        "-webkit-ime-mode": "active",
        "-moz-ime-mode": "active",
        "-ms-ime-mode": "active"
    },
    disableIme: {
        imeMode: "inactive",
        "-webkit-ime-mode": "inactive",
        "-moz-ime-mode": "inactive",
        "-ms-ime-mode": "inactive"
    }
}))

const matchOptions = {
    shouldSort: true,
    threshold: 0.2,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [
        "translation",
        "synonyms"
    ]
}

export const ReviewDisplay = ({review, submitDisabled, onExit, exitDisabled, onSubmit}: PropTypes) => {
    const classes = useStyles()
    const {t} = useTranslation()
    const [isWrong, setWrong] = useState(false)
    const [fieldToTest, setFieldToTest] = useStateOnChange(() => selectTestableField(review), [review])
    const fieldToShow = fieldToTest === "meaning" ? "translation" : fieldToTest === "pronunciation" ? "translation" : "meaning"
    //const langConverter = converter(review.card.deck!.language.languageCode)
    const {response, valid} = useValidatedFormState({response: ""}, {response: [{fun: notEmpty, message: "Response can't be empty"}]})

    const checkAnswer = () => {
        if(isWrong) {
            onSubmit(fieldToTest, false)
            setWrong(false)
            response.set("")
            setFieldToTest(selectTestableField(review))
            return
        }
        const correct = fieldToTest === "translation"
            ? new Fuse([review.card], matchOptions).search(response.value).length > 0
            : review.card[fieldToTest]!.toLowerCase() === response.value.toLowerCase()
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
                type={fieldToTest === "meaning" ? "tel" : "text"}
                autoFocus className={clsx(classes.responseField, {[classes.useIme]: fieldToTest !== "meaning", [classes.disableIme]: fieldToTest === "meaning"})}/>
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
    let testableFields: ReviewFields[] = review.card.pronunciation && review.card.pronunciation.length > 0 ? ["meaning", "pronunciation", "translation"] : ["meaning", "translation"]
    testableFields = testableFields.filter(field => !review.reviewedFields!.includes(field))
    return testableFields[Math.floor(Math.random() * testableFields.length)]
}

export default ReviewDisplay
