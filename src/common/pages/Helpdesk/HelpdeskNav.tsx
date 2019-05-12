import {Divider, List, ListItem, ListItemText} from "@material-ui/core"
import * as React from "react"
import {useTranslation} from "react-i18next"
import useRouter from "use-react-router/use-react-router"
import {useHelpPageListQuery} from "../../../generated/graphql"
import ApolloErrorBox from "../../components/common/ApolloErrorBox"
import ResponsiveDrawer from "../../components/common/ResponsiveDrawer"
import {TimedCircularProgress} from "../../components/common/TimedCircularProgress"

export const HelpdeskNav = () => {
    const {t} = useTranslation()
    const {history} = useRouter()
    const {data, loading, error} = useHelpPageListQuery()

    if(loading) return <TimedCircularProgress />
    if(error) return <ApolloErrorBox error={error} />

    const pages = data!.helpPages

    return (
        <ResponsiveDrawer isOpen={false}>
            <List component="nav" disablePadding>
                {pages.map(page => (
                    <React.Fragment key={page!.id}>
                        <ListItem button onClick={() => history.push(`/help/${page!.slug}`)}>
                            <ListItemText primary={t(page!.title)} />
                        </ListItem>
                        <Divider />
                    </React.Fragment>
                ))}
            </List>
        </ResponsiveDrawer>
    )
}

export default HelpdeskNav
