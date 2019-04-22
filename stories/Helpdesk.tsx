import {List, ListItem, ListItemText} from "@material-ui/core"
import {makeStyles} from "@material-ui/styles"
import ResponsiveDrawer from "../src/common/components/common/ResponsiveDrawer"
import React from "react"

const useTempStyles = makeStyles({
    listItemText: {
        color: "#fff"
    }
})

export const Helpdesk = () => {
    const tempClasses = useTempStyles()

    return (
        <ResponsiveDrawer isOpen={true}>
            <List>
                {["General", "Input", "Account"].map(text => (
                    <ListItem button key={text}>
                        <ListItemText primary={text} className={tempClasses.listItemText}/>
                    </ListItem>
                ))}
            </List>
        </ResponsiveDrawer>
    )
}
