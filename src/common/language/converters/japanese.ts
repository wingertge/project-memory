import {Converter} from "./index"
import * as wanakana from "wanakana"

const converter: Converter = {
    transformPronunciation: value => wanakana.toHiragana(value),
    transformTranslation: value => wanakana.toKana(value)
}

export default converter

