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
