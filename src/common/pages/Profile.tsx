import {createStyles, withStyles, WithStyles} from "@material-ui/core"
import * as React from "react"
import {withTranslation} from "react-i18next"
import {compose, pure} from "recompose"
import Heading from "../components/common/Heading"

const styles = createStyles({})

type Props = WithStyles<typeof styles>

const Profile = () => (
    <Heading>Profile</Heading>
)

// noinspection JSUnusedGlobalSymbols
export default compose<Props, {}>(
    pure,
    withStyles(styles),
    withTranslation()
)(Profile)
