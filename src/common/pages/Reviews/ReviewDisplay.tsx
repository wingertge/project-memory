import {Button, TextField, Theme, Typography} from "@material-ui/core"
import {createStyles, withStyles, WithStyles} from "@material-ui/styles"
import * as _ from "lodash"
import * as React from "react"
import {withTranslation, WithTranslation} from "react-i18next"
import {compose, pure, withPropsOnChange} from "recompose"
import {Review, ReviewFields} from "../../../generated/graphql"
import {FormWithErrors, withHandlers, withProps, withState, withValidatedFormState} from "../../enhancers"
import {notEmpty} from "../../util/validationUtils"

interface PropTypes {
    review: Review
    onSubmit: (testedField: ReviewFields, correct: boolean) => void
    submitDisabled?: boolean
    onExit?: () => void
    exitDisabled?: boolean
}

interface ExtraTypes {
    fieldToShow: ReviewFields
    fieldToTest: ReviewFields
}

interface StateTypes {
    isWrong: boolean
}

interface UpdaterTypes {
    updateIsWrong: (state: boolean) => void
    setFieldToTest: (value: ReviewFields) => void
}

interface FormTypes extends FormWithErrors<FormTypes> {
    response: string
}

interface FormHandlerTypes {
    onResponseChange: (event) => void
    updateResponse: (value: string) => void
}

interface HandlerTypes {
    onInputKeyPress: (event) => void
    checkAnswer: () => void
}

type Props = PropTypes & ExtraTypes & WithTranslation & FormTypes & FormHandlerTypes & HandlerTypes & StateTypes & UpdaterTypes & WithStyles<typeof styles>

const styles = (theme: Theme) => createStyles({
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
})

export const ReviewDisplayRaw = ({t, classes, review, fieldToTest, fieldToShow, response, onResponseChange, onInputKeyPress, errors, checkAnswer, isWrong, submitDisabled, onExit, exitDisabled}: Props) => (
    <div className={classes.review}>
        <Typography variant="h3" className={classes.shownValue}>{review.card[fieldToShow]}</Typography>
        <Typography variant="h6">{t(fieldToTest)}</Typography>
        <TextField
            variant="filled"
            inputProps={{style: {textAlign: "center", fontSize: "20pt", paddingTop: 10}}}
            value={response}
            onChange={onResponseChange}
            onKeyPress={onInputKeyPress}
            error={!!errors.response || isWrong}
            helperText={errors.response}
            autoFocus className={classes.responseField} />
        {isWrong && <Typography variant="h6" color="error">{t("Your answer was wrong. Correct answer: {{answer}}", {answer: review.card[fieldToTest]})}</Typography>}
        <div className={classes.nav}>
            <Button onClick={onExit!} variant="contained" disabled={exitDisabled}>{t("Exit")}</Button>
            <div className={classes.spacer} />
            <Button onClick={checkAnswer} variant="contained" color="primary" disabled={!_.isEmpty(errors) || submitDisabled}>{t(isWrong ? "Next" : "Submit")}</Button>
        </div>
    </div>
)

const selectTestableField = (review: Review) => {
    let testableFields: ReviewFields[] = review.card.pronunciation ? ["meaning", "pronunciation", "translation"] : ["meaning", "translation"]
    testableFields = testableFields.filter(field => !review.reviewedFields!.includes(field))
    return testableFields[Math.floor(Math.random() * testableFields.length)]
}

export default compose<Props, PropTypes>(
    pure,
    withStyles(styles),
    withTranslation(),
    withValidatedFormState<FormTypes, Props>({
        response: ""
    }, {response: [{fun: notEmpty, message: "Response can't be empty"}]}),
    withState<Props, boolean>("isWrong", "updateIsWrong", false),
    withPropsOnChange<Partial<ExtraTypes>, Props>(
        ({review: currentReview}, {review: nextReview}) => currentReview.id !== nextReview.id || currentReview.reviewedFields!.length !== nextReview.reviewedFields!.length,
        ({review}) => ({fieldToTest: selectTestableField(review)})
    ),
    withProps<Props>(({fieldToTest}) => ({fieldToShow: fieldToTest === "meaning" ? "translation" : fieldToTest === "pronunciation" ? "translation" : "meaning"})),
    withHandlers<Props>({
        checkAnswer: ({response, review, fieldToTest, onSubmit, isWrong, updateIsWrong, setFieldToTest, updateResponse}) => () => {
            if(isWrong) {
                onSubmit(fieldToTest, false)
                updateIsWrong(false)
                updateResponse("")
                setFieldToTest(selectTestableField(review))
                return
            }
            const correct = review.card[fieldToTest] === response
            if(correct) {
                onSubmit(fieldToTest, correct)
                updateResponse("")
            } else updateIsWrong(true)
        }
    }),
    withHandlers<Props>({
        onInputKeyPress: ({checkAnswer, errors, response}) => event => {
            if(event.key === "Enter" && _.isEmpty(errors) && response !== "") {
                event.preventDefault()
                checkAnswer()
            }
        }
    })
)(ReviewDisplayRaw)
