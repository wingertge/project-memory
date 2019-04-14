import japanese from "./japanese"

export interface Converter {
    onPronunciationChange: (value: string, expected: string) => string
    onTranslationChange: (value: string, expected: string) => string
}

const languages: {[languageCode: string]: Converter} = {
    "jp-JP": japanese
}

const defaultConverter: Converter = {
    onTranslationChange: value => value,
    onPronunciationChange: value => value
}

export const converter = (languageCode: string) => languages[languageCode] || defaultConverter
