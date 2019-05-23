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

import {Avatar, Theme, Typography, Zoom} from "@material-ui/core"
import {createStyles, makeStyles} from "@material-ui/styles"
import * as React from "react"
import {useTranslation} from "react-i18next"
import {Language} from "../../../generated/graphql"
import LanguageIcon from "../../components/common/LanguageIcon"

interface PropTypes {
    language?: Language
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        position: "relative",
        width: 220,
        height: 60,
        marginLeft: theme.spacing(1)
    },
    container: {
        backgroundColor: theme.palette.background.paper,
        borderRadius: 30,
        position: "absolute",
        top: 0,
        left: 0,
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    languageIcon: {
        width: 60,
        height: 60
    },
    languageName: {
        width: 160,
        textAlign: "start",
        marginLeft: theme.spacing(1)
    }
}))

export const LargeLanguageDisplay = ({language}: PropTypes) => {
    const classes = useStyles()
    const {t} = useTranslation()

    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <Avatar src="" className={classes.languageIcon}/>
                <div className={classes.languageName}/>
            </div>
            {language && (
                <Zoom in={true} timeout={300}>
                    <div className={classes.container}>
                        <LanguageIcon language={language} className={classes.languageIcon}/>
                        <Typography variant="body1" className={classes.languageName}>
                            {`${t(language.name)} (${language.nativeName})`}
                        </Typography>
                    </div>
                </Zoom>
            )}
        </div>
    )
}

export default LargeLanguageDisplay
