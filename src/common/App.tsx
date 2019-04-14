import {Theme} from "@material-ui/core"
import {createStyles, withStyles, WithStyles} from "@material-ui/styles"
import React from "react"
import AppHeader from "./components/common/Header"
import Routes from "./Routes"

const styles = (theme: Theme) => createStyles({
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

type Props = WithStyles<typeof styles>

const App = ({classes}: Props) => (
    <div>
        <AppHeader />
        <div className={classes.content}>
            <Routes />
        </div>
    </div>
)

export {App as RawApp}
export default withStyles(styles)(App)
