/*
The following is the license for the Project Memory Frontend, a frontend for the Project Memory web app.
Copyright (C) 2019  Genna Wingert

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

import {ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Hidden, Typography} from "@material-ui/core"
import {ExpandMore} from "@material-ui/icons"
import {createStyles, makeStyles} from "@material-ui/styles"
import clsx from "clsx"
import * as React from "react"
import {useTranslation} from "react-i18next"
import {useHelpPageQuery} from "../../../generated/graphql"
import ApolloErrorBox from "../../components/apollo/ApolloErrorBox"
import RichText from "../../components/common/RichText"
import {Theme} from "../../theme"

interface PropTypes {
    slug: string
    setDrawerOpen: (val: boolean) => void
    drawerOpen
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
        padding: theme.spacing(0, 8),
        "& .paragraph": {
            textAlign: "left"
        },
        [theme.breakpoints.down("xs")]: {
            padding: theme.spacing(0, 2)
        }
    },
    section: {
        paddingTop: theme.spacing(4)
    }
}))

export const HelpdeskArticle = ({slug, setDrawerOpen, drawerOpen}: PropTypes) => {
    const classes = useStyles()
    const {t} = useTranslation("help")
    const {data, loading, error} = useHelpPageQuery({variables: {slug}})

    if(loading) return null
    if(error) return <ApolloErrorBox error={error} />

    const article = data!.helpPage!

    return (
        <div className={classes.root}>
            <main className={classes.main}>
                <Hidden smUp implementation="css">
                    <Typography variant="subtitle1" gutterBottom color="textSecondary" onClick={() => setDrawerOpen(!drawerOpen)} style={{cursor: "pointer"}}>
                        {t("See a list of all articles.")}
                    </Typography>
                </Hidden>
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
                {article.folds!.length > 0 && (
                    <section className={classes.section}>
                        {article.folds.map((fold, index) => {
                            const title = article.foldTitles![index]
                            return (
                                <React.Fragment key={title}>
                                    <Hidden smUp>
                                        <ExpansionPanel>
                                            <ExpansionPanelSummary expandIcon={<ExpandMore/>}>
                                                <Typography variant="h6">{t(title)}</Typography>
                                            </ExpansionPanelSummary>
                                            <ExpansionPanelDetails>
                                                <RichText raw={fold.raw}/>
                                            </ExpansionPanelDetails>
                                        </ExpansionPanel>
                                    </Hidden>
                                    <Hidden xsDown initialWidth="lg">
                                        <Typography variant="h6">{t(title)}</Typography>
                                        <RichText raw={fold.raw} />
                                    </Hidden>
                                </React.Fragment>
                            )
                        })}
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
