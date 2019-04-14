import * as React from "react"
import {withTranslation} from "react-i18next"
import {compose, pure} from "recompose"
import Heading from "../components/common/Heading"

const Profile = () => (
    <Heading>Profile</Heading>
)

// noinspection JSUnusedGlobalSymbols
export default compose(
    pure,
    withTranslation()
)(Profile)
