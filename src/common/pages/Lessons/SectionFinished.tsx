import {Button, Theme, Typography} from "@material-ui/core"
import {createStyles, makeStyles} from "@material-ui/styles"
import * as React from "react"
import {useTranslation} from "react-i18next"
import useRouter from "use-react-router/use-react-router"
import Checkmark from "../../assets/checkmark.png"

interface PropTypes {
    onMoreLessonsClick: () => void
    lessonCount: number
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    all: {
        margin: theme.spacing(1, 1, 1, 2)
    },
    image: {
        width: 250,
        margin: theme.spacing(0, 2)
    }
}))

export const SectionFinished = ({lessonCount}: PropTypes) => {
    const classes = useStyles()
    const {t} = useTranslation()
    const {history} = useRouter()

    return (
        <div>
            <Typography variant="h5" className={classes.all}>{t("Done!")}</Typography>
            <img src={Checkmark} alt={t("Done")} className={classes.image}/>
            <Typography variant="body1" className={classes.all}>
                {t("You can do more lessons, or go back to the home page.")}
            </Typography>
            <Button onClick={() => history.push("/")} className={classes.all}>{t("Home")}</Button>
            <Button disabled={lessonCount === 0} title={lessonCount === 0 ? t("No more lessons available") : undefined}
                    className={classes.all}>{t("More lessons")}</Button>
        </div>
    )
}

export default SectionFinished
