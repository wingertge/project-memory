import {createMuiTheme} from "@material-ui/core/styles"

/*const rawTheme = createMuiTheme({
    palette: {
        primary: {
            light: "#69696a",
            main: "#28282a",
            dark: "#1e1e1f",
        },
        secondary: {
/!*            light: "#fff5f8",
            main: "#ff3366",
            dark: "#e62958",*!/
            light: "#ffb6c1",
            main: "#ff69b4",
            dark: "#ff1493",
        },
        // @ts-ignore
        warning: {
            main: "#ffc071",
            dark: "#ffb25e",
        },
        error: {
            xLight: red[50],
            main: red[500],
            dark: red[700],
        },
        success: {
            xLight: green[50],
            dark: green[700],
        },
        appBar: {
            light: "#ffb6c1",
            main: "#ff69b4",
            dark: "#ff1493",
        }
    },
    typography: {
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', Arial, sans-serif",
        fontSize: 14,
        fontWeightLight: 300, // Work Sans
        fontWeightRegular: 400, // Work Sans
        fontWeightMedium: 700, // Roboto Condensed
        fontFamilySecondary: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
        fontFamilyCode: "source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace",
        useNextVariants: true,
    },
})


const fontHeader = {
    color: rawTheme.palette.text.primary,
    fontWeight: rawTheme.typography.fontWeightMedium,
    // @ts-ignore
    fontFamily: rawTheme.typography.fontFamilySecondary,
    /!*    textTransform: "uppercase",*!/
}

// @ts-ignore
const theme = {
    ...rawTheme,
    palette: {
        ...rawTheme.palette,
        background: {
            ...rawTheme.palette.background,
            default: rawTheme.palette.common.white,
            placeholder: grey[200],
        },
    },
    typography: {
        ...rawTheme.typography,
        h1: {
            ...rawTheme.typography.h1,
            ...fontHeader,
            letterSpacing: 0,
            fontSize: 60,
        },
        h2: {
            ...rawTheme.typography.h2,
            ...fontHeader,
            fontSize: 48,
        },
        h3: {
            ...rawTheme.typography.h3,
            ...fontHeader,
            fontSize: 42,
        },
        h4: {
            ...rawTheme.typography.h4,
            ...fontHeader,
            fontSize: 36,
        },
        h5: {
            ...rawTheme.typography.h5,
            ...fontHeader,
            fontSize: 24,
            fontWeight: rawTheme.typography.fontWeightLight,
        },
        h6: {
            ...rawTheme.typography.h6,
            ...fontHeader,
            fontSize: 18,
        },
        subtitle1: {
            ...rawTheme.typography.subtitle1,
            fontSize: 18,
        },
        body1: {
            ...rawTheme.typography.body2,
            fontWeight: rawTheme.typography.fontWeightRegular,
            fontSize: 16,
        },
        body2: {
            ...rawTheme.typography.body1,
            fontSize: 14,
        },
    },
}*/

export default createMuiTheme({
    typography: {
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', Arial, sans-serif",
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
