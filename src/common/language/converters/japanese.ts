import {Converter} from "./index"
import wanakana from "wanakana"

const converter: Converter = {
    onPronunciationChange: value => wanakana.toHiragana(value),
    onTranslationChange: value => wanakana.toKana(value)
}

export default converter
