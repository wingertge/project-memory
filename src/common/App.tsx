import React from "react"
import {createStyles, Theme, WithStyles, withStyles} from "@material-ui/core/styles"
import AppHeader from "./components/common/AppHeader"
import Routes from "./Routes"

const styles = (theme: Theme) => createStyles({
    content: {
        textAlign: "center",
        marginTop: theme.spacing.unit * 2,
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
