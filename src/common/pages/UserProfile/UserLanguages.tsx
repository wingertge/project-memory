import {Theme} from "@material-ui/core"
import {createStyles, makeStyles} from "@material-ui/styles"
import * as React from "react"
import {oc} from "ts-optchain"
import {Language, useUserLanguagesQuery} from "../../../generated/graphql"
import ApolloErrorBox from "../../components/apollo/ApolloErrorBox"
import {TimedCircularProgress} from "../../components/apollo/TimedCircularProgress"
import LanguageDisplay from "../Settings/LanguageSettings/LanguageDisplay"

interface PropTypes {
    userId: string
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    divider: {
        width: 1,
        backgroundColor: theme.palette.background.paper
    },
    root: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        borderRadius: 8,
        borderStyle: "solid",
        borderWidth: 2,
        borderColor: theme.palette.background.paper,
        marginTop: theme.spacing(2)
    },
    nativeLanguage: {
        backgroundColor: theme.palette.background.paper
    }
}))

export const UserLanguages = ({userId}: PropTypes) => {
    const classes = useStyles()
    const {data, loading, error} = useUserLanguagesQuery({variables: {userId}})
    const languages = oc(data).user.languages([]) as Language[]
    const nativeLanguage = oc(data).user.nativeLanguage() as Language

    if(error) return <ApolloErrorBox error={error} />
    if(loading) return <TimedCircularProgress />

    return (
        <div className={classes.root}>
            {nativeLanguage && (
                <div className={classes.nativeLanguage}>
                    <LanguageDisplay language={nativeLanguage} />
                </div>
            )}
            {languages.map(lang => <LanguageDisplay key={lang.id} language={lang} />)}
        </div>
    )
}

export default UserLanguages
