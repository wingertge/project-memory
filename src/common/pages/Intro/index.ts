import {withStyles} from "@material-ui/styles"
import {withTranslation} from "react-i18next"
import {compose, pure} from "recompose"
import {withUser} from "../../enhancers"
import {RawIntro} from "./component"
import styles from "./styles"
import {Props} from "./types"

export const Intro = compose<Props, {}>(
    pure,
    withStyles(styles),
    withTranslation(),
    withUser<Props>()
)(RawIntro)

export default Intro
