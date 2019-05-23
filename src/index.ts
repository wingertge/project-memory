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

/* tslint:disable:no-console no-var-requires */
// tslint:disable-next-line:no-reference
///<reference path="./typings/index.d.ts"/>

import express from "express"
import dotenv from "dotenv"
dotenv.config()
import proc from "./server/env"

let app = require("./server").default

if (module.hot) {
    module.hot.accept("./server", () => {
        console.log("🔁  HMR Reloading `./server`...")
        try {
            app = require("./server").default
        } catch (error) {
            console.error(error)
        }
    })
    console.info("✅  Server-side HMR Enabled!")
}

const port = proc.env.PORT || 3000

// noinspection TypeScriptValidateJSTypes
const listen = express()
    .use((req, res) => app.handle(req, res))
    .listen(port, () => {
        console.log(`> Started on port ${port}`)
    })
export default listen
