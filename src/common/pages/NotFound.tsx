import {createStyles, makeStyles} from "@material-ui/styles"
import * as React from "react"
import {useTranslation} from "react-i18next"
import Heading from "../components/common/Heading"

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
            <Heading>{t("I'm sorry Dave, I'm afraid I can't let you do that.")}</Heading>
            <img src={"/static/media/notfound.png"} alt={t("Disappointed Tapir")} className={classes.image}/>
        </div>
    )
}

export default NotFound
