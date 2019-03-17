import i18n from "i18next"
import LanguageDetector from "i18next-browser-languagedetector"

i18n
.use(LanguageDetector)
.init({
    resources: {
        en: {
            translations: {

            }
        }
    },
    fallbackLng: "en",
    debug: true,

    ns: ["translations"],
    defaultNS: "translations",

    keySeparator: false,

    interpolation: {
        escapeValue: false,
        formatSeparator: ","
    },

    react: {
        wait: true
    }
})

export default i18n
