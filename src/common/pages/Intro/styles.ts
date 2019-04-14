import {Theme} from "@material-ui/core"
import {createStyles} from "@material-ui/styles"

export default (theme: Theme) => createStyles({
    root: {
        [theme.breakpoints.up("sm")]: {
            marginTop: theme.spacing(-2)
        }
    },
    stepRoot: {
        marginTop: theme.spacing(2)
    }
})
