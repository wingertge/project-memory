import {
    Button,
    CircularProgress,
    createStyles,
    Step,
    StepLabel,
    Stepper,
    Theme,
    withStyles,
    WithStyles
} from "@material-ui/core"
import * as React from "react"
import {withTranslation, WithTranslation} from "react-i18next"
import {compose, lifecycle} from "recompose"
import {oc} from "ts-optchain"
import {Review, withLessons} from "../../../generated/graphql"
import ErrorBox from "../../components/common/ErrorBox"
import {renderOnError, renderWhileLoading, withHandlers, WithID, withID, withState} from "../../enhancers"
import LessonDisplay from "./LessonDisplay"
import LessonQuiz from "./LessonQuiz"
import SectionFinished from "./SectionFinished"

interface StateTypes {
    lessonIndex: number
    setLessonIndex: (value: ((current: number) => number) | number) => void
    isDone: boolean
    setDone: (value: boolean) => void
}

interface GQLTypes {
    lessons: Review[]
}

interface HandlerTypes {
    onKeyPress: (event) => void
    onMoreLessons: () => void
    onQuizFinished: () => void
}

type Props = WithStyles<typeof styles> & WithTranslation & StateTypes & WithID & GQLTypes & HandlerTypes

const styles = (theme: Theme) => createStyles({
    root: {
        [theme.breakpoints.up("sm")]: {
            marginTop: theme.spacing.unit * -2
        }
    },
    nav: {
        display: "flex"
    },
    spacer: {
        flex: "1 1 100%"
    },
    button: {
        margin: theme.spacing.unit
    }
})

export const LessonsRaw = ({t, classes, lessonIndex, setLessonIndex, lessons, isDone, onMoreLessons, onQuizFinished}: Props) => (
    <div className={classes.root}>
        <Stepper activeStep={lessonIndex}>
            {[...lessons.keys()].map(step => (
                <Step key={step}>
                    <StepLabel>{t("Lesson {{step}}", {step: step + 1})}</StepLabel>
                </Step>
            ))}
            <Step key="quiz">
                <StepLabel>{t("Quiz")}</StepLabel>
            </Step>
        </Stepper>
        {lessonIndex < lessons.length && <LessonDisplay card={lessons[lessonIndex].card} />}
        {lessonIndex >= lessons.length && lessons.length !== 0 && !isDone && <LessonQuiz reviews={lessons} onQuizFinished={onQuizFinished} />}
        {isDone && <SectionFinished onMoreLessonsClick={onMoreLessons} lessonCount={lessons.length} />}
        {lessonIndex < lessons.length && (
            <div className={classes.nav}>
                <Button disabled={lessonIndex === 0} onClick={() => setLessonIndex(i => i - 1)} className={classes.button}>
                    {t("Back")}
                </Button>
                <div className={classes.spacer} />
                <Button variant="contained" color="primary" onClick={() => setLessonIndex(i => i + 1)} className={classes.button}>
                    {t("Next")}
                </Button>
            </div>
        )}
    </div>
)

export default compose<Props, {}>(
    withStyles(styles),
    withTranslation(),
    withState<Props, number>("lessonIndex", "setLessonIndex", 0),
    withState<Props, boolean>("isDone", "setDone", false),
    withID(),
    withLessons<Props, GQLTypes>({
        options: ({id}) => ({
            variables: {
                userId: id,
                filter: {
                    limit: 5
                }
            },
            fetchPolicy: "no-cache"
        }),
        props: ({data}) => ({
            data,
            lessons: oc(data).user.lessonQueue([]) as Review[]
        })
    }),
    renderWhileLoading(CircularProgress),
    renderOnError(ErrorBox),
    withHandlers<Props>({
        onKeyPress: ({setLessonIndex, lessonIndex, lessons}) => event => {
            if(event.keyCode === 13 && lessonIndex < lessons.length) {
                setLessonIndex(i => i + 1)
            }
            if(event.keyCode === 8 && lessonIndex > 0 && lessonIndex < lessons.length) {
                setLessonIndex(i => i - 1)
            }
        },
        onMoreLessons: ({setLessonIndex, setDone}) => () => {
            setLessonIndex(0)
            setDone(false)
        },
        onQuizFinished: ({setDone, data}) => async () => {
            setDone(true)
            await data!.refetch()
        }
    }),
    lifecycle<Props, {}>({
        componentDidMount() {
            document.addEventListener("keydown", this.props.onKeyPress, false)
        },
        componentWillUnmount() {
            document.removeEventListener("keydown", this.props.onKeyPress, false)
        }
    })
)(LessonsRaw)
