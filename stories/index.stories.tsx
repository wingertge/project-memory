import {Button} from "@material-ui/core"
import React from "react"

import {storiesOf} from "@storybook/react"
import {linkTo} from "@storybook/addon-links"

import {Welcome} from "@storybook/react/demo"
import {Helpdesk} from "./Helpdesk"
import UserProfile from "./UserProfile"
//import Badges from "./UserProfile/Badges"
import {withTheme} from "./withTheme"

/*const withTheme = component => (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        {component}
    </ThemeProvider>
)*/

storiesOf("Welcome", module).add("to Storybook", () => <Welcome showApp={linkTo("Button")}/>)

storiesOf("Button", module)
    .addDecorator(withTheme())
    .add("Helpdesk", () => <Helpdesk />)
    .add("with some emoji", () => (
        <Button>
            😀 😎 👍 💯
        </Button>
    ))

storiesOf("Profile", module)
.addDecorator(withTheme())
.add("User Profile", () => <UserProfile />)
