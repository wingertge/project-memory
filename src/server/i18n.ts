import * as fs from "fs"
import Middleware from "i18next-express-middleware"
import path from "path"
import {baseOptions} from "../common/i18n"
import i18next from "i18next"
import NodeBackend from "i18next-node-fs-backend"

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)
export const appSrc = resolveApp("src")

export const preloadI18n = i18n => {
    const initialI18nStore = {}
    i18n.languages.forEach(l => {
        initialI18nStore[l] = i18n.services.resourceStore.data[l]
    })
    const initialLanguage = i18n.language
    return {initialI18nStore, initialLanguage}
}

export const initI18n = (serverCallback: () => void) => {
    i18next
        .use(Middleware.LanguageDetector)
        .use(NodeBackend)
        .init({
            preload: false,
            backend: {
                loadPath: `${appSrc}/locales/{{lng}}/{{ns}}.json`,
                addPath: `${appSrc}/locales/{{lng}}/{{ns}}.missing.json`
            },
            keySeparator: false,
            debug: false,
            ...baseOptions
        }, serverCallback)
}
