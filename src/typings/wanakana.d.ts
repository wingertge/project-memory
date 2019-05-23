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

declare module "wanakana" {
    interface WanaKanaOptions {
        IMEMode?: boolean | string
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
