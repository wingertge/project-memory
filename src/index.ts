/* tslint:disable:no-console no-var-requires */
import express from "express"
import Loadable from "react-loadable"

import dotenv from "dotenv"
dotenv.config()

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

const port = process.env.PORT || 3000

// noinspection TypeScriptValidateJSTypes
const listen = Loadable.preloadAll().then(() => {
    express()
        .use((req, res) => app.handle(req, res))
        .listen(port, err => {
            if (err) {
                console.error(err)
                return
            }
            console.log(`> Started on port ${port}`)
        })
})
export default listen