import {Hidden, MobileStepper, Slide, Step, StepLabel, Stepper, Theme} from "@material-ui/core"
import {createStyles, makeStyles} from "@material-ui/styles"
import {Redirect} from "@reach/router"
import * as React from "react"
import Helmet from "react-helmet"
import {useTranslation} from "react-i18next"
import {TimedCircularProgress} from "../../components/apollo/TimedCircularProgress"
import {useUser} from "../../hooks"
import ConfirmUsernameStep from "./ConfirmUsernameStep"
import FinishedStep from "./FinishedStep"
import FirstDeckStep from "./FirstDeckStep"
import LearningLanguageStep from "./LearningLanguageStep"
import NativeLanguageStep from "./NativeLanguageStep"

const useStyles = makeStyles((theme: Theme) => createStyles({
        stepRoot: {
            marginTop: theme.spacing(2)
        }
    })
)

const NullElement = () => null

const stepsLabels = ["Native language", "Learning language", "First Deck", "Check Username", "Done!"]

export const Intro = () => {
    const classes = useStyles()
    const {t} = useTranslation()
    const user = useUser()

    if(!user) return <TimedCircularProgress />
    const introStep = user.introStep || 0

    return (
        <div>
            <Helmet>
                <title>{t("Get started with Project Memory")}</title>
            </Helmet>
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
                    {(!introStep || introStep === 0) && <NativeLanguageStep/>}
                    {introStep === 1 && <LearningLanguageStep/>}
                    {introStep === 2 && <FirstDeckStep/>}
                    {introStep === 3 && <ConfirmUsernameStep/>}
                    {introStep === 4 && <FinishedStep/>}
                    {introStep === -1 && <Redirect to="/" />}
                </div>
            </Slide>
            <Hidden smUp implementation="css">
                <MobileStepper steps={5} position="static" activeStep={introStep || 0} nextButton={<NullElement/>}
                               backButton={<NullElement/>}/>
            </Hidden>
        </div>
    )
}

export default Intro
