import {Theme} from "@material-ui/core"
import {createStyles} from "@material-ui/styles"

export const styles = (theme: Theme) => createStyles({
    textField: {
        width: 400
    },
    form: {
        margin: theme.spacing(2)
    }
})
