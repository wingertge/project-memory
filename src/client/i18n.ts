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

import i18n from "i18next"
import LanguageDetector from "i18next-browser-languagedetector"
//import Backend from "i18next-chained-backend"
//import CacheBackend from "i18next-localstorage-backend"
import XhrBackend from "i18next-xhr-backend"
import moment from "moment"
import {baseOptions} from "../common/i18n"

i18n
    .use(LanguageDetector)
    .use(XhrBackend)
    .init({
        backend: {
            loadPath: "/locales/{{lng}}/{{ns}}.json",
            addPath: "/locales/add/{{lng}}/{{ns}}"
/*            backends: [CacheBackend, XhrBackend],
            backendOptions: [{
                prefix: "i18next_res_",
                expirationTime: 7 * 24 * 60 * 60 * 1000,
                versions: {},
                store: window.localStorage
            }, {
                loadPath: "/locales/{{lng}}/{{ns}}.json",
                addPath: "/locales/add/{{lng}}/{{ns}}"
            }],*/
        },
        keySeparator: false,
        debug: false,
        ...baseOptions,
        saveMissing: false
    })

i18n.on("languageChanged", lang => moment.locale(lang))

export default i18n
