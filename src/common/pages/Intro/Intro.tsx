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
