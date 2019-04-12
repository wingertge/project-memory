import {Button, createStyles, Theme, Typography, WithStyles, withStyles} from "@material-ui/core"
import * as React from "react"
import {withTranslation, WithTranslation} from "react-i18next"
import {RouteComponentProps, withRouter} from "react-router"
import {compose} from "recompose"
import {UpdateProfileDocument, UpdateProfileMutation, UpdateProfileMutationVariables} from "../../../generated/graphql"
import {WithMutation, withMutation, withUser, WithUser} from "../../enhancers"

type Props = WithTranslation & WithUser & WithMutation & RouteComponentProps<{}> & WithStyles<typeof styles>

const styles = (theme: Theme) => createStyles({
    button: {
        marginTop: theme.spacing.unit * 4
    }
})

export const FinishedStepRaw = ({classes, t, submitMutation}: Props) => (
    <>
        <Typography variant="h6">
            {t("Aaand - Done! You're good to go now, enjoy Project Memory! If you have any more questions feel free to look at our beginner's guide or ask it on the forum.")}
        </Typography>
        <Button variant="contained" color="primary" onClick={submitMutation} className={classes.button}>{t("Will do!")}</Button>
    </>
)

export default compose<Props, {}>(
    withStyles(styles),
    withTranslation(),
    withRouter,
    withUser(),
    withMutation<Props, UpdateProfileMutation, UpdateProfileMutationVariables>(UpdateProfileDocument, ({user}) => ({
        id: user.id,
        profile: {
            introStep: -1
        }
    }), ({history}) => {
        history.push("/")
    })
)(FinishedStepRaw)
