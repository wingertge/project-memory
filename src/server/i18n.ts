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

import * as fs from "fs"
import Middleware from "i18next-express-middleware"
import path from "path"
import {baseOptions} from "../common/i18n"
import i18next from "i18next"
import NodeBackend from "i18next-node-fs-backend"
import moment from "moment"

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

    i18next.on("languageChanged", lang => moment.locale(lang))
}
