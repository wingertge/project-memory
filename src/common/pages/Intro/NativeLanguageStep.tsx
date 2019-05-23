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

import {Theme, Typography} from "@material-ui/core"
import {createStyles, makeStyles} from "@material-ui/styles"
import {useState} from "react"
import * as React from "react"
import Helmet from "react-helmet"
import {useTranslation} from "react-i18next"
import {Language, useUpdateProfileMutation} from "../../../generated/graphql"
import {TimedCircularProgress} from "../../components/apollo/TimedCircularProgress"
import {useUser} from "../../hooks"
import LargeLanguageDisplay from "./LargeLanguageDisplay"
import LargeLanguagePicker from "./LargeLanguagePicker"

const useStyles = makeStyles((theme: Theme) => createStyles({
    titleContainer: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    spacer: {
        width: theme.spacing(2)
    }
}))

export const NativeLanguageStep = () => {
    const classes = useStyles()
    const {t} = useTranslation()
    const user = useUser()
    const [language, setLanguage] = useState<Language | undefined>(undefined)
    const [updateProfile] = useUpdateProfileMutation()
    const pickLanguage = (lang: Language) => {
        setLanguage(lang)
        setTimeout(() => {
            updateProfile({
                variables: {
                    id: user.id,
                    profile: {
                        nativeLanguage: lang.id,
                        introStep: 1
                    }
                }
            })
        }, 800)
    }

    if(!user) return <TimedCircularProgress />

    return (
        <>
            <Helmet>
                <title>{t("Native Language - Project Memory")}</title>
            </Helmet>
            <div className={classes.titleContainer}>
                <Typography variant="h6">
                    {t("Hello, {{username}}! Welcome to Project Memory (dun dun dun). How about you pick your native language to start with?", {username: user.username})}
                </Typography>
                <div className={classes.spacer}/>
                <LargeLanguageDisplay language={language}/>
            </div>
            <LargeLanguagePicker updateLanguage={pickLanguage}/>
        </>
    )
}

export default NativeLanguageStep
