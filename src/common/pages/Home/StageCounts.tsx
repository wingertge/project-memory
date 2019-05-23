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

import {Card, Theme} from "@material-ui/core"
import {createStyles, makeStyles} from "@material-ui/styles"
import React from "react"
import StageCountDisplay from "./StageCountDisplay"

const useStyles = makeStyles((theme: Theme) => createStyles({
    container: {
        display: "flex"
    },
    card: {
        width: `calc(100% - ${theme.spacing(4)}px)`,
        maxWidth: 1000
    },
    root: {
        display: "flex",
        justifyContent: "center",
        padding: theme.spacing(2, 0)
    }
}))

export const StageCounts = () => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <Card className={classes.card}>
                <div className={classes.container}>
                    <StageCountDisplay stage="Egg"/>
                    <StageCountDisplay stage="Hatchling"/>
                    <StageCountDisplay stage="Chick"/>
                    <StageCountDisplay stage="Chicken"/>
                    <StageCountDisplay stage="Mother Hen"/>
                </div>
            </Card>
        </div>
    )
}

export default StageCounts
