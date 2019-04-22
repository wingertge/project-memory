import {Theme, Tooltip, Typography} from "@material-ui/core"
import {makeStyles} from "@material-ui/styles"
import * as React from "react"
import {useTranslation} from "react-i18next"
import {useUser} from "../../hooks"
import badgeList, {Badge} from "./badgeList"

interface PropTypes {
    userId: string
}

const useStyles = makeStyles((theme: Theme) => ({
    badgeImage: {
        width: 80,
        height: 80,
        margin: theme.spacing(0.5)
    },
    container: {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "fit-content",
        padding: theme.spacing(1)
    },
    header: {
        marginRight: theme.spacing(1)
    }
}))

export const Badges = ({userId}: PropTypes) => {
    const classes = useStyles()
    const {t} = useTranslation()
    const user = useUser(userId)

    if(!user) return null

    const badges = user.badges.map(badge => badgeList[badge!]).filter(a => !!a) as Badge[]

    return (
        <div className={classes.container}>
            {badges.length > 0 && <Typography variant="h6" gutterBottom className={classes.header}>{t("Badges")}</Typography>}
            {badges.map(badge => (
                <Tooltip key={badge.name} title={(
                    <div>
                        <Typography variant="h6">{t(badge.title)}</Typography>
                        <Typography>{t(badge.description)}</Typography>
                    </div>
                )}>
                    <img src={badge.icon} alt={t(badge.title)} className={classes.badgeImage} />
                </Tooltip>
            ))}
        </div>
    )
}

export default Badges
