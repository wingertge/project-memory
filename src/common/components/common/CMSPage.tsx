import {Theme, Typography} from "@material-ui/core"
import {createStyles, makeStyles} from "@material-ui/styles"
import clsx from "clsx"
import * as React from "react"
import useRouter from "use-react-router/use-react-router"
import {usePageQuery} from "../../../generated/graphql"
import NotFound from "../../pages/NotFound"
import ErrorBox from "./ErrorBox"
import RichText from "./RichText"
import {TimedCircularProgress} from "./TimedCircularProgress"

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        marginTop: theme.spacing(-2)
    },
    mainImage: {
        width: "100%",
        margin: "0 auto",
        backgroundRepeat: "no-repeat",
        backgroundSize: "1600px 100%",
        backgroundPosition: "top center",
        maxWidth: 1600,
        height: 400
    },
    imageTextContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    imageText: {
        backgroundColor: theme.palette.background.paper,
        display: "inline-block",
        marginTop: theme.spacing(2),
        padding: theme.spacing(1)
    },
    content: {
        padding: theme.spacing(2, 6),
        "& img": {
            maxWidth: 250,
            height: "auto"
        },
        [theme.breakpoints.up("lg")]: {
            padding: theme.spacing(2, 16)
        }
    }
}))

export const CMSPage = () => {
    const classes = useStyles()
    const {match: {params: {slug}}} = useRouter<{slug: string}>()
    const {data, error, loading} = usePageQuery({variables: {slug}})

    if(error) return <ErrorBox text={JSON.stringify(error)} title="" />
    if(loading) return <TimedCircularProgress />
    if(!data || !data.page) return <NotFound />

    const page = data.page!

    return (
        <div className={classes.root}>
            <Typography variant="h4">{page.header}</Typography>
            {page.mainImage && (
                <div style={{
                    backgroundImage: `url(${page.mainImage.url})`
                }} className={clsx(classes.mainImage)}>
                    <div className={classes.imageTextContainer}>
                        <Typography variant="h5" className={classes.imageText}>{page.imageHeader}</Typography>
                        <Typography variant="h6" className={classes.imageText}>{page.imageSubheader}</Typography>
                    </div>
                </div>
            )}
            <main className={classes.content}>
                {page.intro!.raw && <RichText raw={page.intro!.raw} />}
                {page.main!.raw && <RichText raw={page.main!.raw} />}
                {page.blurbs!.raw && <RichText raw={page.blurbs!.raw} />}
                {page.outro!.raw && <RichText raw={page.outro!.raw} />}
            </main>
        </div>
    )
}

export default CMSPage
