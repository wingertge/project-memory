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
        debug: true,
        ...baseOptions
    })

i18n.on("languageChanged", lang => moment.locale(lang))

export default i18n
