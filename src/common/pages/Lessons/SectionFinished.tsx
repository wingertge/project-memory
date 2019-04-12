import {Button, createStyles, Theme, Typography, withStyles, WithStyles} from "@material-ui/core"
import * as React from "react"
import {withTranslation, WithTranslation} from "react-i18next"
import {RouteComponentProps, withRouter} from "react-router"
import {compose} from "recompose"
import {withHandlers} from "../../enhancers"
import Checkmark from "../../assets/checkmark.png"

interface PropTypes {
    onMoreLessonsClick: () => void
    lessonCount: number
}

interface HandlerTypes {
    goToHome: () => void
}

type Props = WithTranslation & RouteComponentProps<{}> & HandlerTypes & PropTypes & WithStyles<typeof styles>

const styles = (theme: Theme) => createStyles({
    all: {
        margin: theme.spacing.unit,
        marginBottom: theme.spacing.unit * 2
    },
    image: {
        width: 250,
        marginBottom: theme.spacing.unit * 2,
        marginTop: theme.spacing.unit * 2
    }
})

export const SectionFinishedRaw = ({t, classes, goToHome, lessonCount}: Props) => (
    <div>
        <Typography variant="h5" className={classes.all}>{t("Done!")}</Typography>
        <img src={Checkmark} alt={t("Done")} className={classes.image} />
        <Typography variant="body1" className={classes.all}>
            {t("You can do more lessons, or go back to the home page.")}
        </Typography>
        <Button onClick={goToHome} className={classes.all}>{t("Home")}</Button>
        <Button disabled={lessonCount === 0} title={lessonCount === 0 ? t("No more lessons available") : undefined} className={classes.all}>{t("More lessons")}</Button>
    </div>
)

export default compose<Props, PropTypes>(
    withStyles(styles),
    withTranslation(),
    withRouter,
    withHandlers<Props>({
        goToHome: ({history}) => () => history.push("/")
    })
)(SectionFinishedRaw)
