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

import {Button, Grid, Hidden, Theme, Typography} from "@material-ui/core"
import {createStyles, makeStyles} from "@material-ui/styles"
import React from "react"
import Helmet from "react-helmet"
import {useTranslation} from "react-i18next"
import AppHeader from "./components/common/Header"
import LinkButton from "./components/common/LinkButton"
import {useNow} from "./hooks"
import Routes from "./Routes"
import PatreonButton from "./assets/become_a_patron_button@2x.png"
import PatreonButtonSmall from "./assets/Patreon_Mark_Coral.svg"
import {Location} from "@reach/router"

const useStyles = makeStyles((theme: Theme) => createStyles({
        root: {
            height: "100%",
            overflow: "auto",
            display: "flex",
            flexDirection: "column"
        },
        content: {
            textAlign: "center",
            //marginTop: theme.spacing(2),
            flex: "1 1 100%"
        },
        footer: {
            backgroundColor: theme.palette.background.paper,
            marginTop: theme.spacing(4),
            padding: theme.spacing(2),
            zIndex: theme.zIndex.drawer + 1,
            borderTop: "1px solid rgba(255, 255, 255, 0.12)"
        },
        patreonButton: {
            width: 170,
            height: 40,
            borderRadius: 4
        },
        patreonButtonSmall: {
            width: 40,
            height: 40
        },
        footerButton: {
            height: 40
        },
        "@global": {
            "*::-webkit-scrollbar-thumb": {
                borderRadius: "1ex",
                "-webkit-box-shadow": theme.shadows[1],
                backgroundColor: theme.palette.primary.main
            },
            "*::-webkit-scrollbar": {
                width: 8,
                height: 8,
                backgroundColor: theme.palette.background.paper
            },
            "#root": {
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                right: 0
            },
            a: {
                color: theme.palette.primary.main,
                textDecoration: "none",
                cursor: "pointer",
                "&:hover": {
                    textDecoration: "underline"
                }
            }
        }
    })
)

export const App = () => {
    const classes = useStyles()
    const {t} = useTranslation()
    const now = useNow()
    return (
        <div className={classes.root}>
            <Helmet>
                <title>{t("Project Memory")}</title>
            </Helmet>
            <Location>
                {props => <AppHeader {...props} />}
            </Location>
            <div className={classes.content}>
                <Routes/>
            </div>
            <footer className={classes.footer}>
                <Grid container>
                    <Grid item container direction="column" justify="center" xs={3}>
                        <Hidden xsDown implementation="css">
                            <Typography>{t("© {{year}} Genna Wingert", {year: now.getFullYear()})}</Typography>
                        </Hidden>
                        <Hidden smUp implementation="css">
                            <Typography>{t("© {{year}}", {year: now.getFullYear()})}</Typography>
                        </Hidden>
                    </Grid>
                    <Grid item xs={3} style={{textAlign: "center"}}>
                        <LinkButton to="/help" className={classes.footerButton}>{t("Help")}</LinkButton>
                    </Grid>
                    <Grid item xs={3} style={{textAlign: "center"}}>
                        <LinkButton to="/contact" className={classes.footerButton}>{t("Contact")}</LinkButton>
                    </Grid>
                    <Grid item xs={3} style={{textAlign: "right"}}>
                        <Hidden xsDown implementation="css">
                            <Button href="https://www.patreon.com/bePatron?u=17099413" style={{padding: 0}}>
                                <img alt={t("Become a Patron!")} src={PatreonButton} className={classes.patreonButton}/>
                            </Button>
                        </Hidden>
                        <Hidden smUp implementation="js">
                            <Button href="https://www.patreon.com/bePatron?u=17099413" style={{padding: 0}}>
                                <img src={PatreonButtonSmall} alt={t("Become a Patron!")} className={classes.patreonButtonSmall}/>
                            </Button>
                        </Hidden>
                        {/*<a href="https://www.patreon.com/bePatron?u=17099413" data-patreon-widget-type="become-patron-button">Become a Patron!</a>*/}
                    </Grid>
                </Grid>
            </footer>
        </div>
    )
}

export default App
