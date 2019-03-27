import {createStyles, withStyles} from "@material-ui/core"
import React from "react"
import {WithTranslation, withTranslation} from "react-i18next"
import {compose, pure} from "recompose"
import Heading from "../components/common/Heading"

const styles = createStyles({})

type Props = WithTranslation

const Home = ({t}: Props) => (
    <div>
        <Heading>{t("Home")}</Heading>
    </div>
)

// noinspection JSUnusedGlobalSymbols
export default compose<Props, {}>(
    pure,
    withStyles(styles),
    withTranslation()
)(Home)
