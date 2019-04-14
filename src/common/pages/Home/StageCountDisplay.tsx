import {CircularProgress, Theme, Tooltip, Typography} from "@material-ui/core"
import {createStyles, makeStyles} from "@material-ui/styles"
import clsx from "clsx"
import * as React from "react"
import {useTranslation} from "react-i18next"
import {oc} from "ts-optchain"
import {useReviewsCountQuery} from "../../../generated/graphql"
import ApolloErrorBox from "../../components/common/ApolloErrorBox"
import Egg from "../../assets/egg.png"
import Hatchling from "../../assets/hatchling.png"
import Chick from "../../assets/chick.png"
import Chicken from "../../assets/chicken.png"
import MotherHen from "../../assets/mother_hen.png"
import {useID} from "../../hooks"

type Stage = "Egg" | "Hatchling" | "Chick" | "Chicken" | "Mother Hen"

interface PropTypes {
    stage: Stage
}

const styles = (theme: Theme) => createStyles({
    root: {
        width: "20%",
        "&:before": {
            paddingTop: "100%",
            content: `""`,
            display: "block"
        },
        position: "relative"
    },
    content: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    egg: {
        backgroundColor: theme.palette.primary.light
    },
    hatching: {
        backgroundColor: theme.palette.primary.main
    },
    chick: {
        backgroundColor: "#b73c9e"
    },
    chicken: {
        backgroundColor: "#b23cb7"
    },
    motherHen: {
        backgroundColor: "#73338e"
    },
    tooltip: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: theme.spacing(-0.5)
    },
    icon: {
        height: 40,
        marginTop: theme.spacing(2)
    }
})

const useStyles = makeStyles(styles)

const icons: {[Key in Stage]: any} = {
    Egg,
    Hatchling,
    Chick,
    Chicken,
    "Mother Hen": MotherHen
}

const stages: {[Key in Stage]: number[]} = {
    Egg: [1, 2, 3],
    Hatchling: [4, 5],
    Chick: [6, 7],
    Chicken: [8, 9],
    "Mother Hen": [10]
}

const StageCountDisplay = ({stage}: PropTypes) => {
    const classes = useStyles()
    const {t} = useTranslation()
    const id = useID()

    const {data, loading, error} = useReviewsCountQuery({
        variables: {
            userId: id,
            filter: {
                boxes: stages[stage]
            }
        }
    })

    const reviewsCount = oc(data).user.reviewsCount(0)

    if(error) return <ApolloErrorBox error={error} />
    if(loading) return <CircularProgress />

    return (
        <div className={classes.root}>
            <div className={clsx(
                classes.content,
                {
                    [classes.egg]: stage === "Egg",
                    [classes.hatching]: stage === "Hatchling",
                    [classes.chick]: stage === "Chick",
                    [classes.chicken]: stage === "Chicken",
                    [classes.motherHen]: stage === "Mother Hen"
                }
            )}>
                <Tooltip title={(
                    <div className={classes.tooltip}>
                        <Typography variant="h6" gutterBottom>{t(stage)}</Typography>
                    </div>
                )}>
                    <div>
                        <Typography variant="h2">{reviewsCount}</Typography>
                        <img src={icons[stage]} alt={t(stage)} className={classes.icon}/>
                    </div>
                </Tooltip>
            </div>
        </div>
    )

}

export default StageCountDisplay
