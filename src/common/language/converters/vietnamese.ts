import {Converter} from "./index"

const converter: Converter = {
    transformTranslation: value => {
        let val = value
        val = val.replace(/aa/, "â").replace(/a6/, "â").replace(/a\^/, "â")
        val = val.replace(/ee/, "ê").replace(/e6/, "ê").replace(/e\^/, "ê")
        val = val.replace(/oo/, "ô").replace(/o6/, "ô").replace(/o\^/, "ô")
        val = val.replace(/aw/, "ă").replace(/a8/, "ă").replace(/a\(/, "ă")
        val = val.replace(/ow/, "ơ").replace(/o7/, "ơ").replace(/o\+/, "ơ")
        val = val.replace(/uw/, "ư").replace(/u7/, "ư").replace(/u\+/, "ư").replace(/w/, "ư")
        val = val.replace(/dd/, "đ").replace(/d9/, "đ")

        return val
    }
}


export default converter
