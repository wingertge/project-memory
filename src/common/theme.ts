import {createMuiTheme, Theme as BaseTheme} from "@material-ui/core"
import {Typography} from "@material-ui/core/styles/createTypography"

export interface Theme extends BaseTheme {
    typography: Typography & {fontFamilyCode: string}
}

const theme = createMuiTheme({
    typography: {
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', Arial, sans-serif",
        // @ts-ignore
        fontFamilyCode: "source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace"
    },
    palette: {
        type: "dark",
        primary: {
            light: "#ff69b4",
            main: "#ff1493",
            dark: "#ff1493",
        },
        secondary: {
            light: "#0093dd",
            main: "#294ddb",
            dark: "#882d9e"
        }
    },
    direction: "ltr"
})

theme.overrides = {
    MuiTooltip: {
        tooltip: {
            fontSize: theme.typography.pxToRem(14)
        }
    }
}

export default theme
