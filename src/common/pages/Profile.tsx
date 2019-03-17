import React from "react"
import {withStyles, Typography, CircularProgress, WithStyles, createStyles} from "@material-ui/core"
import {withTranslation} from "react-i18next"
import {compose, pure} from "recompose"
import {createSelector} from "reselect"
import {oc} from "ts-optchain"
import Heading from "../components/common/Heading"
import LanguageDisplay from "../components/profile/LanguageDisplay"
import {GetProfile} from "../../generated-models"
import ProfileForm from "../components/profile/ProfileForm"
import {redirectOnError, renderWhileLoading, WithToast, withToast} from "../enhancers"

const styles = createStyles({
    languages: {
        listStyleType: "none",
        margin: 0
    },
    languageEntry: {
        display: "inline"
    }
})

interface GraphQLPropTypes {
    isSocialConnection: boolean
}

type Props = WithStyles<typeof styles> & GraphQLPropTypes & GetProfile.Props & WithToast

const Profile = ({user, classes, isSocialConnection}: Props) => (
    <div>
        <Heading>Profile</Heading>
        <img style={{maxWidth: 50, maxHeight: 50}} src={user.picture} alt="profile pic"/>
        <ProfileForm profile={user!} isSocial={isSocialConnection}/>
        <div>
            <Typography variant="subtitle1">
                Languages
            </Typography>
            <ul className={classes.languages}>
                {user.languages!.map(lang => <li key={lang!.id} className={classes.languageEntry}>
                    <LanguageDisplay language={lang!}/></li>)}
            </ul>
        </div>
    </div>
)

export {Profile as RawProfile}

const isSocialSelector = createSelector(
    (data: Partial<GetProfile.Query>) => oc(data).user.identities([]),
    identities => !identities.some(identity => !(oc(identity).isSocial(true)))
)

const withGQL = GetProfile.HOC<Props, GraphQLPropTypes>({
    props: ({data}) => ({
        data,
        isSocialConnection: isSocialSelector(data!),
        user: data!.user
    }),
    options: {errorPolicy: "ignore"}
})

export default compose<Props, {}>(
    pure,
    withStyles(styles),
    withTranslation(),
    withGQL,
    redirectOnError("/"),
    renderWhileLoading(CircularProgress),
    withToast("Successfully updated profile")
)(Profile)
