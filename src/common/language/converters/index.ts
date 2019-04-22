/* tslint:disable:object-literal-key-quotes */
import japanese from "./japanese"
import vietnamese from "./vietnamese"

export interface Converter {
    transformPronunciation?: (value: string) => string
    transformTranslation: (value: string) => string
}

const languages: {[languageCode: string]: Converter} = {
    "ja-JP": japanese,
    "vi": vietnamese
}

const defaultConverter: Converter = {
    transformTranslation: value => value,
    transformPronunciation: value => value
}

export const converter = (languageCode: string) => languages[languageCode] || defaultConverter
