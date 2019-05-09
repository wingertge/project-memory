import {Button, Grid, Theme, Typography} from "@material-ui/core"
import {createStyles, makeStyles} from "@material-ui/styles"
import React from "react"
import {useTranslation} from "react-i18next"
import AppHeader from "./components/common/Header"
import LinkButton from "./components/common/LinkButton"
import {useNow} from "./hooks"
import Routes from "./Routes"
import PatreonButton from "./assets/become_a_patron_button@2x.png"

const useStyles = makeStyles((theme: Theme) => createStyles({
        root: {
            height: "100%",
            overflow: "auto",
            display: "flex",
            flexDirection: "column"
        },
        content: {
            textAlign: "center",
            marginTop: theme.spacing(2),
            flex: "1 1 100%"
        },
        footer: {
            backgroundColor: theme.palette.background.paper,
            marginTop: theme.spacing(4),
            padding: theme.spacing(2)
        },
        patreonButton: {
            width: 170,
            height: 40,
            borderRadius: 4
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
                color: theme.palette.text.secondary,
                textDecoration: "none",
                "&:visited": {
                    color: theme.palette.text.secondary,
                    textDecoration: "none"
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
            <AppHeader/>
            <div className={classes.content}>
                <Routes/>
            </div>
            <footer className={classes.footer}>
                <Grid container>
                    <Grid item container direction="column" justify="center" xs={3}>
                        <Typography>{t("© {{year}} Genna Wingert", {year: now.getFullYear()})}</Typography>
                    </Grid>
                    <Grid item xs={3} style={{textAlign: "center"}}>
                        <LinkButton to="/help" className={classes.footerButton}>{t("Help")}</LinkButton>
                    </Grid>
                    <Grid item xs={3} style={{textAlign: "center"}}>
                        <LinkButton to="/contact" className={classes.footerButton}>{t("Contact")}</LinkButton>
                    </Grid>
                    <Grid item xs={3} style={{textAlign: "right"}}>
                        <Button href="https://www.patreon.com/bePatron?u=17099413" style={{padding: 0}}>
                            <img alt={t("Become a Patron!")} src={PatreonButton} className={classes.patreonButton} />
                        </Button>
                        {/*<a href="https://www.patreon.com/bePatron?u=17099413" data-patreon-widget-type="become-patron-button">Become a Patron!</a>*/}
                    </Grid>
                </Grid>
            </footer>
        </div>
    )
}

export default App
