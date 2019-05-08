import {Grid, Theme, Typography} from "@material-ui/core"
import {createStyles, makeStyles} from "@material-ui/styles"
import clsx from "clsx"
import * as React from "react"
import useRouter from "use-react-router/use-react-router"
import {usePageQuery} from "../../generated/graphql"
import ErrorBox from "../components/common/ErrorBox"
import RichText from "../components/common/RichText"
import {TimedCircularProgress} from "../components/common/TimedCircularProgress"
import NotFound from "./NotFound"

interface PropTypes {
    slug?: string
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        marginTop: theme.spacing(-2)
    },
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
    imageTextContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        [theme.breakpoints.up(1600)]: {
            marginTop: "-25%"
        },
        [theme.breakpoints.down(533)]: {
            marginTop: "-75%"
        }
    },
    imageText: {
        backgroundColor: theme.palette.background.paper + "80",
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
    },
    section: {
        padding: theme.spacing(2, 0)
    }
}))

export const CMSPage = ({slug}: PropTypes) => {
    const classes = useStyles()
    const {match: {params: {slug: routeSlug}}} = useRouter<{slug: string}>()
    slug = slug || routeSlug
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
                        <Typography variant="h3" className={classes.imageText}>{page.imageHeader}</Typography>
                        <Typography variant="h4" className={classes.imageText}>{page.imageSubheader}</Typography>
                    </div>
                </div>
            )}
            <main className={classes.content}>
                <Grid container spacing={8}>
                    {page.intro!.raw && (
                        <Grid item xs={12} lg={6} component="section">
                            <RichText raw={page.intro!.raw} />
                        </Grid>
                    )}
                    {page.main!.raw && (
                        <Grid item xs={12} lg={6} component="section">
                            <RichText raw={page.main!.raw} />
                        </Grid>
                    )}
                    {page.blurbs!.raw && (
                        <Grid item xs={12} lg={6} component="section">
                            <RichText raw={page.blurbs!.raw} />
                        </Grid>
                    )}
                    {page.outro!.raw && (
                        <Grid item xs={12} lg={6} component="section">
                            <RichText raw={page.outro!.raw} />
                        </Grid>
                    )}
                </Grid>
            </main>
        </div>
    )
}

export default CMSPage
