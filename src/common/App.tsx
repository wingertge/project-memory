import {Theme} from "@material-ui/core"
import {createStyles, makeStyles} from "@material-ui/styles"
import React from "react"
import AppHeader from "./components/common/Header"
import Routes from "./Routes"

const useStyles = makeStyles((theme: Theme) => createStyles({
        content: {
            textAlign: "center",
            marginTop: theme.spacing(2),
        },
        "@global": {
            "*::-webkit-scrollbar-thumb": {
                borderRadius: "1ex",
                "-webkit-box-shadow": theme.shadows[1],
                backgroundColor: theme.palette.primary.main
            },
            "*::-webkit-scrollbar": {
                width: 8,
                height: 8,
                backgroundColor: theme.palette.background.paper
            }
        }
    })
)

export const App = () => {
    const classes = useStyles()
    return (
        <div>
            <AppHeader/>
            <div className={classes.content}>
                <Routes/>
            </div>
        </div>
    )
}

export default App
