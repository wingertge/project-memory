import {createStyles, withStyles, WithStyles} from "@material-ui/styles"
import * as React from "react"
import {withTranslation, WithTranslation} from "react-i18next"
import {compose, pure} from "recompose"
import Heading from "../components/common/Heading"

type Props = WithTranslation & WithStyles<typeof styles>

const styles = createStyles({
    image: {
        width: 500
    }
})

const NotFound = ({t, classes}: Props) => (
    <div>
        <Heading>{t("I'm sorry Dave, I'm afraid I can't let you do that.")}</Heading>
        <img src={"/static/media/notfound.png"} alt={t("Disappointed Tapir")} className={classes.image} />
    </div>
)

export default compose<Props, {}>(
    pure,
    withStyles(styles),
    withTranslation()
)(NotFound)
