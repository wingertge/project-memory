import {
    Button,
    CircularProgress,
    Step,
    StepLabel,
    Stepper,
    Theme
} from "@material-ui/core"
import {createStyles, makeStyles} from "@material-ui/styles"
import {useEffect, useState} from "react"
import * as React from "react"
import {useTranslation} from "react-i18next"
import {oc} from "ts-optchain"
import {Review, useLessonsQuery} from "../../../generated/graphql"
import ApolloErrorBox from "../../components/common/ApolloErrorBox"
import {useID} from "../../hooks"
import LessonDisplay from "./LessonDisplay"
import LessonQuiz from "./LessonQuiz"
import SectionFinished from "./SectionFinished"

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        [theme.breakpoints.up("sm")]: {
            marginTop: theme.spacing(-2)
        }
    },
    nav: {
        display: "flex"
    },
    spacer: {
        flex: "1 1 100%"
    },
    button: {
        margin: theme.spacing(1)
    }
}))

export const Lessons = () => {
    const classes = useStyles()
    const {t} = useTranslation()
    const id = useID()
    const [lessonIndex, setLessonIndex] = useState(0)
    const [isDone, setDone] = useState(false)
    const {data, loading, error, refetch} = useLessonsQuery({
        variables: {
            userId: id,
            filter: {
                limit: 5
            }
        }
    })
    const lessons = oc(data).user.lessonQueue([]) as Review[]

    const onKeyPress = event => {
        if(event.keyCode === 13 && lessonIndex < lessons.length) {
            setLessonIndex(i => i + 1)
        }
        if(event.keyCode === 8 && lessonIndex > 0 && lessonIndex < lessons.length) {
            setLessonIndex(i => i - 1)
        }
    }

    const onMoreLessons = () => {
        setLessonIndex(0)
        setDone(false)
    }

    const onQuizFinished = async () => {
        await refetch()
        setDone(true)
    }

    useEffect(() => {
        document.addEventListener("keydown", onKeyPress, false)
        return () => {
            document.removeEventListener("keydown", onKeyPress, false)
        }
    })

    if(error) return <ApolloErrorBox error={error} />
    if(loading) return <CircularProgress />

    return (
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
            {lessonIndex < lessons.length && <LessonDisplay card={lessons[lessonIndex].card}/>}
            {lessonIndex >= lessons.length && lessons.length !== 0 && !isDone &&
            <LessonQuiz reviews={lessons} onQuizFinished={onQuizFinished}/>}
            {isDone && <SectionFinished onMoreLessonsClick={onMoreLessons} lessonCount={lessons.length}/>}
            {lessonIndex < lessons.length && (
                <div className={classes.nav}>
                    <Button disabled={lessonIndex === 0} onClick={() => setLessonIndex(i => i - 1)}
                            className={classes.button}>
                        {t("Back")}
                    </Button>
                    <div className={classes.spacer}/>
                    <Button variant="contained" color="primary" onClick={() => setLessonIndex(i => i + 1)}
                            className={classes.button}>
                        {t("Next")}
                    </Button>
                </div>
            )}
        </div>
    )
}

export default Lessons
