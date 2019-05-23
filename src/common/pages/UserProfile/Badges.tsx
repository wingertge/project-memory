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

import {Theme, Tooltip, Typography} from "@material-ui/core"
import {makeStyles} from "@material-ui/styles"
import * as React from "react"
import {useTranslation} from "react-i18next"
import {useUser} from "../../hooks"
import badgeList, {Badge} from "./badgeList"

interface PropTypes {
    userId: string
}

const useStyles = makeStyles((theme: Theme) => ({
    badgeImage: {
        width: 80,
        height: 80,
        margin: theme.spacing(0.5)
    },
    container: {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "fit-content",
        padding: theme.spacing(1)
    },
    header: {
        marginRight: theme.spacing(1)
    }
}))

export const Badges = ({userId}: PropTypes) => {
    const classes = useStyles()
    const {t} = useTranslation()
    const user = useUser(userId)

    if(!user) return null

    const badges = user.badges.map(badge => badgeList[badge!]).filter(a => !!a) as Badge[]

    return (
        <div className={classes.container}>
            {badges.length > 0 && <Typography variant="h6" gutterBottom className={classes.header}>{t("Badges")}</Typography>}
            {badges.map(badge => (
                <Tooltip key={badge.name} title={(
                    <div>
                        <Typography variant="h6">{t(badge.title)}</Typography>
                        <Typography>{t(badge.description)}</Typography>
                    </div>
                )}>
                    <img src={badge.icon} alt={t(badge.title)} className={classes.badgeImage} />
                </Tooltip>
            ))}
        </div>
    )
}

export default Badges
