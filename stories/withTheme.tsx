import {CssBaseline} from "@material-ui/core"
import {ThemeProvider} from "@material-ui/styles"
import {makeDecorator} from "@storybook/addons"
import * as React from "react"
import theme from "../src/common/theme"

export const withTheme = makeDecorator({
    name: "withTheme",
    parameterName: "theme",
    wrapper: (story, context) => {
        return (
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {story(context)}
            </ThemeProvider>
        )
    }
})
