import {createStyles, Theme} from "@material-ui/core"

export default (theme: Theme) => createStyles({
    root: {
        [theme.breakpoints.up("sm")]: {
            marginTop: theme.spacing.unit * -2
        }
    },
    stepRoot: {
        marginTop: theme.spacing.unit * 2
    }
})
