import {Typography} from "@material-ui/core"
import {createStyles, makeStyles} from "@material-ui/styles"
import clsx from "clsx"
import * as React from "react"
import {useTranslation} from "react-i18next"
import {useHelpPageQuery} from "../../../generated/graphql"
import ApolloErrorBox from "../../components/common/ApolloErrorBox"
import RichText from "../../components/common/RichText"
import {TimedCircularProgress} from "../../components/common/TimedCircularProgress"
import {Theme} from "../../theme"

interface PropTypes {
    slug: string
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    mainImage: {
        width: "100%",
        margin: "0 auto",
        backgroundRepeat: "no-repeat",
        backgroundSize: "1600px 400px",
        backgroundPosition: "top center",
        height: 400,
        [theme.breakpoints.up(1600)]: {
            height: 0,
            paddingTop: "25%",
            backgroundSize: "100%"
        },
        [theme.breakpoints.down(533)]: {
            height: 0,
            paddingTop: "75%",
            backgroundSize: "300% 100%"
        }
    },
    root: {
        [theme.breakpoints.up("sm")]: {
            paddingLeft: 300
        }
    },
    main: {
        padding: theme.spacing(2, 8),
        "& .paragraph": {
            textAlign: "left"
        }
    },
    section: {
        paddingTop: theme.spacing(4)
    }
}))

export const HelpdeskArticle = ({slug}: PropTypes) => {
    const classes = useStyles()
    const {t} = useTranslation()
    const {data, loading, error} = useHelpPageQuery({variables: {slug}})

    if(loading) return <TimedCircularProgress />
    if(error) return <ApolloErrorBox error={error} />

    const article = data!.helpPage!

    return (
        <div className={classes.root}>
            <main className={classes.main}>
                {article.header && <Typography variant="h5">{t(article.header)}</Typography>}
                {article.mainImage && (
                    <div style={{
                        backgroundImage: `url(${article.mainImage.url})`
                    }} className={clsx(classes.mainImage)} />
                )}
                {article.intro!.raw && (
                    <section className={classes.section}>
                        <RichText raw={article.intro!.raw} />
                    </section>
                )}
                {article.main!.raw && (
                    <section className={classes.section}>
                        <RichText raw={article.main!.raw} />
                    </section>
                )}
                {article.outro!.raw && (
                    <section className={classes.section}>
                        <RichText raw={article.outro!.raw} />
                    </section>
                )}
                {article.references!.raw && (
                    <section className={classes.section}>
                        <RichText raw={article.references!.raw} />
                    </section>
                )}
            </main>
        </div>
    )
}

export default HelpdeskArticle