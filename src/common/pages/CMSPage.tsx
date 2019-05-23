import loadable from "@loadable/component"
import {Grid, Link, Theme, Typography} from "@material-ui/core"
import {createStyles, makeStyles} from "@material-ui/styles"
import {RouteComponentProps} from "@reach/router"
import clsx from "clsx"
import * as React from "react"
import Helmet from "react-helmet"
import {useTranslation} from "react-i18next"
import {usePageQuery} from "../../generated/graphql"
import LinkButton from "../components/common/LinkButton"
import RichText from "../components/common/RichText"
import {TimedCircularProgress} from "../components/apollo/TimedCircularProgress"
import v4 from "uuid/v4"

interface PropTypes extends RouteComponentProps<{slug: string}> {
    slug?: string
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
    },
    blurbs: {
        textAlign: "left"
    },
    header: {
        marginTop: theme.spacing(2)
    }
}))

const NotFound = loadable(() => import(/* webpackChunkName: "not-found" */"./NotFound"), {fallback: <TimedCircularProgress />})

export const CMSPage = ({slug}: PropTypes) => {
    const {t} = useTranslation("cms")
    const classes = useStyles()
    const {data, error, loading} = usePageQuery({variables: {slug: slug!}})

    if(loading) return <TimedCircularProgress />
    if(!data || !data.page || error) return <NotFound />

    const page = data.page!
    const title = page.header || page.imageHeader || slug

    return (
        <div>
            <Helmet>
                <title>{t(`${title} - Project Memory`)}</title>
            </Helmet>
            {page.header && <Typography variant="h4" className={classes.header}>{page.header}</Typography>}
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
                        <Grid item xs={12} component="section">
                            <RichText
                                raw={page.intro!.raw}
                                linkComponent={({to, children}) => <LinkButton to={to} variant="contained" color="primary">{children}</LinkButton>}
                                externalLinkComponent={({href, children}) => <Link href={href}>{children}</Link>}
                            />
                        </Grid>
                    )}
                    {page.main!.raw && (
                        <Grid item xs={12} component="section">
                            <RichText
                                raw={page.main!.raw}
                                linkComponent={({to, children}) => <LinkButton to={to} variant="contained" color="primary">{children}</LinkButton>}
                                externalLinkComponent={({href, children}) => <Link href={href}>{children}</Link>}
                            />
                        </Grid>
                    )}
                    {page.blurbs && page.blurbs.map(({raw}) => (
                        <Grid item xs={12} lg={6} component="section" key={v4()} className={classes.blurbs}>
                            <RichText
                                raw={raw}
                                linkComponent={({to, children}) => <LinkButton to={to} variant="contained" color="primary">{children}</LinkButton>}
                                externalLinkComponent={({href, children}) => <Link href={href}>{children}</Link>}
                            />
                        </Grid>
                    ))}
                    {page.outro!.raw && (
                        <Grid item xs={12} component="section">
                            <RichText
                                raw={page.outro!.raw}
                                linkComponent={({to, children}) => <LinkButton to={to} variant="contained" color="primary">{children}</LinkButton>}
                                externalLinkComponent={({href, children}) => <Link href={href}>{children}</Link>}
                            />
                        </Grid>
                    )}
                </Grid>
            </main>
        </div>
    )
}

export default CMSPage
