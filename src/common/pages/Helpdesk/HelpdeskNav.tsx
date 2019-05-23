import {Divider, List, ListItem, ListItemText} from "@material-ui/core"
import {navigate} from "@reach/router"
import * as React from "react"
import {useTranslation} from "react-i18next"
import {oc} from "ts-optchain"
import {useHelpPageListQuery} from "../../../generated/graphql"
import ApolloErrorBox from "../../components/apollo/ApolloErrorBox"
import ResponsiveDrawer from "../../components/common/ResponsiveDrawer"

interface PropTypes {
    drawerOpen: boolean
}

export const HelpdeskNav = ({drawerOpen}: PropTypes) => {
    const {t} = useTranslation("help")
    const {data, loading, error} = useHelpPageListQuery()

    if(error) return <ApolloErrorBox error={error} />

    const pages = oc(data).helpPages([])

    return (
        <ResponsiveDrawer isOpen={drawerOpen}>
            {!loading && (
                <List component="nav" disablePadding>
                    {pages.map(page => (
                        <React.Fragment key={page!.id}>
                            <ListItem button onClick={() => navigate(`/help/${page!.slug}`)}>
                                <ListItemText primary={t(page!.title)} />
                            </ListItem>
                            <Divider />
                        </React.Fragment>
                    ))}
                </List>
            )}
        </ResponsiveDrawer>
    )
}

export default HelpdeskNav
