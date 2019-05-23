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
    .listen(port, err => {
        if (err) {
            console.error(err)
            return
        }
        console.log(`> Started on port ${port}`)
    })
export default listen
