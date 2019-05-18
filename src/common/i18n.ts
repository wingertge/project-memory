export const baseOptions = {
    fallbackLng: "en",

    ns: ["translations", "cms"],
    defaultNS: "translations",
    saveMissing: true,

    interpolation: {
        escapeValue: false,
        formatSeparator: ","
    },

    react: {
        wait: true
    },

    keySeparator: ">",
    nsSeparator: "|",
    whitelist: ["en"]
}
