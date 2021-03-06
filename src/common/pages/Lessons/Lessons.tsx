/*
The following is the license for the Project Memory Frontend, a frontend for the Project Memory web app.
Copyright (C) 2019  Genna Wingert

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

import {
    Button,
    CircularProgress, Hidden, MobileStepper,
    Step,
    StepLabel,
    Stepper,
    Theme
} from "@material-ui/core"
import {KeyboardArrowLeft, KeyboardArrowRight} from "@material-ui/icons"
import {createStyles, makeStyles, useTheme} from "@material-ui/styles"
import {useEffect, useState} from "react"
import * as React from "react"
import Helmet from "react-helmet"
import {useTranslation} from "react-i18next"
import {oc} from "ts-optchain"
import {Review, useReviewsQuery} from "../../../generated/graphql"
import ApolloErrorBox from "../../components/apollo/ApolloErrorBox"
import {useID, useUpdateNow} from "../../hooks"
import LessonDisplay from "./LessonDisplay"
import LessonQuiz from "./LessonQuiz"
import SectionFinished from "./SectionFinished"

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        height: "100%",
        display: "flex",
        flexDirection: "column"
    },
    nav: {
        display: "flex"
    },
    spacer: {
        flex: "1 1 100%"
    },
    button: {
        margin: theme.spacing(1)
    },
    mobileStepper: {
        position: "relative",
        marginBottom: theme.spacing(-6)
    },
    mobileStepperContainer: {
        display: "flex",
        flexDirection: "column",
        flex: "1 1 100%"
    }
}))

const NullElement = () => null

export const Lessons = () => {
    const classes = useStyles()
    const {t} = useTranslation()
    const theme = useTheme<Theme>()
    const id = useID()
    const [lessonIndex, setLessonIndex] = useState(0)
    const [isDone, setDone] = useState(false)
    const {data, loading, error, refetch} = useReviewsQuery({
        variables: {
            userId: id,
            limit: 5,
            filter: {
                box: {eq: 0}
            }
        }
    })
    const lessons = oc(data).user.reviewQueue([]) as Review[]

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

    const setNow = useUpdateNow()

    const onQuizFinished = async () => {
        setNow()
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
            <Helmet>
                <title>{t("Lessons - Project Memory")}</title>
            </Helmet>
            <Hidden smDown implementation="css">
                <Stepper activeStep={lessonIndex}>
                    {[...lessons.keys()].map(step => (
                        <Step key={step}>
                            <StepLabel>
                                {t("Lesson {{step}}", {step: step + 1})}
                            </StepLabel>
                        </Step>
                    ))}
                    <Step key="quiz">
                        <StepLabel>{t("Quiz")}</StepLabel>
                    </Step>
                </Stepper>
            </Hidden>
            {lessonIndex < lessons.length && <LessonDisplay card={lessons[lessonIndex].card}/>}
            {lessonIndex >= lessons.length && lessons.length !== 0 && !isDone &&
            <LessonQuiz reviews={lessons} onQuizFinished={onQuizFinished}/>}
            {isDone && <SectionFinished onMoreLessonsClick={onMoreLessons} lessonCount={lessons.length}/>}
            {lessonIndex < lessons.length && (
                <Hidden smDown implementation="css">
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
                </Hidden>
            )}
            {/*
            // @ts-ignore */}
            <Hidden mdUp implementation="css" className={classes.mobileStepperContainer}>
                <div className={classes.spacer} />
                <MobileStepper backButton={
                    lessonIndex < lessons.length ? (
                        <Button size="small" onClick={() => setLessonIndex(i => i - 1)} disabled={lessonIndex === 0}>
                            {theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                            Back
                        </Button>
                    ) : <NullElement />
                } nextButton={
                    lessonIndex < lessons.length ? (
                        <Button size="small" onClick={() => setLessonIndex(i => i + 1)}>
                            Next
                            {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                        </Button>
                    ) : <NullElement />
                } steps={lessons.length + 1} activeStep={lessonIndex} className={classes.mobileStepper} />
            </Hidden>
        </div>
    )
}

export default Lessons
