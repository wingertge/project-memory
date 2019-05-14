import {Typography} from "@material-ui/core"
import {createStyles, makeStyles} from "@material-ui/styles"
import * as React from "react"
import Helmet from "react-helmet"
import {useTranslation} from "react-i18next"
import NotFoundImg from "../assets/notfound.png"

const useStyles = makeStyles(createStyles({
    image: {
        width: 500
    }
}))

export const NotFound = () => {
    const classes = useStyles()
    const {t} = useTranslation()

    return (
        <div>
            <Helmet>
                <title>{t("Page not found - Project Memory")}</title>
            </Helmet>
            <Typography variant="h5">{t("I'm sorry Dave, I'm afraid I can't let you do that.")}</Typography>
            <img src={NotFoundImg} alt={t("Disappointed Tapir")} className={classes.image}/>
        </div>
    )
}

export default NotFound
