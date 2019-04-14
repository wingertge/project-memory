declare module "wanakana" {
    interface WanaKanaOptions {
        IMEMode?: boolean
        useObsoleteKana?: boolean
        passRomaji?: boolean
        upcaseKatakana?: boolean
        customKanaMapping?: any
        customRomajiMapping?: any
    }

    const wanakana: {
        bind: (element: any, options?: WanaKanaOptions) => void
        unbind: (element: any) => void
        isJapanese: (str: string) => boolean
        isKana: (str: string) => boolean
        isHiragana: (str: string) => boolean
        isKatakana: (str: string) => boolean
        isKanji: (str: string) => boolean
        toKana: (str: string, options?: WanaKanaOptions) => string
        toHiragana: (str: string, options?: WanaKanaOptions) => string
        toKatakana: (str: string, options?: WanaKanaOptions) => string
        toRomaji: (str: string, options?: WanaKanaOptions) => string
        stripOkurigana: (str: string, options?: WanaKanaOptions) => string
        tokenize: (str: string, options?: WanaKanaOptions) => string[]
    }

    export = wanakana
}
