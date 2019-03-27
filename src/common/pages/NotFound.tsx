import * as React from "react"
import {withTranslation, WithTranslation} from "react-i18next"
import {compose, pure} from "recompose"
import Heading from "../components/common/Heading"

type Props = WithTranslation

const NotFound = ({t}: Props) => (
    <Heading>{t("Page not found ¯\\_(ツ)_/¯")}</Heading>
)

export default compose<Props, {}>(
    pure,
    withTranslation()
)(NotFound)
