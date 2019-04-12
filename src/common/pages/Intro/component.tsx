import {Hidden, MobileStepper, Slide, Step, StepLabel, Stepper} from "@material-ui/core"
import * as React from "react"
import ConfirmUsernameStep from "./ConfirmUsernameStep"
import FinishedStep from "./FinishedStep"
import FirstDeckStep from "./FirstDeckStep"
import LearningLanguageStep from "./LearningLanguageStep"
import NativeLanguageStep from "./NativeLanguageStep"
import {Props} from "./types"

const NullElement = () => null

const stepsLabels = ["Native language", "Learning language", "First Deck", "Check Username", "Done!"]

export const RawIntro = ({t, classes, user: {introStep = 0}}: Props) => (
    <div className={classes.root}>
        <Hidden xsDown implementation="css">
            <Stepper activeStep={introStep || 0}>
                {stepsLabels.map(label => (
                    <Step key={label}>
                        <StepLabel>{t(label)}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Hidden>
        <Slide direction="left" in={true} timeout={(introStep || 0) === 0 ? 0 : 200} mountOnEnter unmountOnExit>
            <div className={classes.stepRoot}>
                {(!introStep || introStep === 0) && <NativeLanguageStep />}
                {introStep === 1 && <LearningLanguageStep />}
                {introStep === 2 && <FirstDeckStep />}
                {introStep === 3 && <ConfirmUsernameStep />}
                {introStep === 4 && <FinishedStep />}
            </div>
        </Slide>
        <Hidden smUp implementation="css">
            <MobileStepper steps={5} position="static" activeStep={introStep || 0} nextButton={<NullElement />} backButton={<NullElement />} />
        </Hidden>
    </div>
)
