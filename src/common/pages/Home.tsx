import {Button, createStyles, Typography, WithStyles, withStyles} from "@material-ui/core"
import React from "react"
import {WithTranslation, withTranslation} from "react-i18next"
import {Redirect, RouteComponentProps, withRouter} from "react-router"
import {compose, pure} from "recompose"
import {oc} from "ts-optchain"
import {withLessonsCount} from "../../generated/graphql"
import Heading from "../components/common/Heading"
import {withHandlers, WithUser, withUser} from "../enhancers"
import Logo from "../assets/logo.png"

const styles = createStyles({
    logo: {
        width: 250
    }
})

interface LessonsCountTypes {
    lessonsCountData: any
    lessonsCount: number
}

interface HandlerTypes {
    openLessons: () => void
}

type Props = WithTranslation & WithUser & LessonsCountTypes & HandlerTypes & RouteComponentProps<{}> & WithStyles<typeof styles>

const Home = ({t, classes, user, lessonsCount, openLessons}: Props) => (
    <div>
        <Heading>{t("Home")}</Heading>
        {(user && (!user.introStep || user.introStep !== -1)) && (
            <Redirect to="/intro" />
        )}
        {lessonsCount > 0 && (
            <div>
                <Typography variant="h6">
                    {t("You have {{lessonsCount}} unreviewed lessons", {lessonsCount})}
                </Typography>
                <Button onClick={openLessons}>{t("Review now")}</Button>
            </div>
        )}
        <img src={Logo} alt={t("Logo")} className={classes.logo} />
    </div>
)

// noinspection JSUnusedGlobalSymbols
export default compose<Props, {}>(
    pure,
    withStyles(styles),
    withTranslation(),
    withRouter,
    withUser<Props>(),
    withLessonsCount<Props, LessonsCountTypes>({
        skip: ({user}) => !user,
        options: ({user}) => ({
            variables: {
                userId: user.id
            },
            fetchPolicy: "cache-and-network"
        }),
        props: ({data}) => ({
            lessonsCountData: data,
            lessonsCount: oc(data).user.lessonsCount(0)
        })
    }),
    withHandlers<Props>({
        openLessons: ({history}) => () => history.push("/lessons")
    })
)(Home)
