import {WithStyles} from "@material-ui/core"
import {WithTranslation} from "react-i18next"
import {WithUser} from "../../enhancers"
import styles from "./styles"

export interface PropTypes {
    introStep: number
}

export type Props = PropTypes & WithTranslation & WithStyles<typeof styles> & WithUser
