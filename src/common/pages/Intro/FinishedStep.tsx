import {Button, Theme, Typography} from "@material-ui/core"
import {createStyles, makeStyles} from "@material-ui/styles"
import * as React from "react"
import Helmet from "react-helmet"
import {useTranslation} from "react-i18next"
import {oc} from "ts-optchain"
import useRouter from "use-react-router/use-react-router"
import {useUpdateProfileMutation} from "../../../generated/graphql"
import {useUser} from "../../hooks"

const useStyles = makeStyles((theme: Theme) => createStyles({
    button: {
        marginTop: theme.spacing(4)
    }
}))

export const FinishedStep = () => {
    const classes = useStyles()
    const {t} = useTranslation()
    const user = useUser()
    const {history} = useRouter()
    const mutate = useUpdateProfileMutation({
        variables: {
            id: oc(user).id(""),
            profile: {
                introStep: -1
            }
        }
    })
    const save = () => mutate().then(() => history.push("/"))

    return (
        <>
            <Helmet>
                <title>{t("Ready for Project Memory")}</title>
            </Helmet>
            <Typography variant="h6">
                {t("Aaand - Done! You're good to go now, enjoy Project Memory! If you have any more questions feel free to look at our beginner's guide or ask it on the forum.")}
            </Typography>
            <Button variant="contained" color="primary" onClick={save} className={classes.button}>{t("Will do!")}</Button>
        </>
    )
}

export default FinishedStep
