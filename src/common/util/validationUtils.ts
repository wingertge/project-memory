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

import validator from "validator"
import {UNICODE_INVALID_CHARACTERS} from "../hooks/constants"
import {length as unicodeLength} from "stringz"
import {PasswordPolicy, charsets} from "password-sheriff"

export const shorterThan = (length: number) => (str: string) => unicodeLength(str) < length
export const longerThan = (length: number) => (str: string) => unicodeLength(str) > length
export const notEmpty = (str: string) => !validator.isEmpty(str)
export const noInvalidCharacters = (invalidChars = UNICODE_INVALID_CHARACTERS) => (str: string) => !validator.matches(str, invalidChars)
export const isEmail = (str: string) => validator.isEmail(str)
export const isEqualTo = (other: number) => (value: any, context: any[]) => value === context[other]
export const passwordStrongEnough = (strength: PasswordStrength = PasswordStrength.Good) => {
    let policy = new PasswordPolicy({length: {minLength: 1}})
    switch (strength) {
        case PasswordStrength.Low:
            policy = new PasswordPolicy({length: {minLength: 6}})
            break
        case PasswordStrength.Fair:
            policy = new PasswordPolicy({length: {minLength: 8}, contains: {expressions: [charsets.lowerCase, charsets.upperCase, charsets.numbers]}})
            break
        case PasswordStrength.Good:
            policy = new PasswordPolicy({length: {minLength: 8}, containsAtLeast: {atLeast: 3, expressions: [charsets.lowerCase, charsets.upperCase, charsets.numbers, charsets.specialCharacters]}})
            break
        case PasswordStrength.Excellent:
            policy = new PasswordPolicy({length: {minLength: 10}, containsAtLeast: {atLeast: 3, expressions: [charsets.lowerCase, charsets.upperCase, charsets.numbers, charsets.specialCharacters]}, identicalChars: {max: 2}})
            break
    }
    return (str: string) => policy.check(str)
}

enum PasswordStrength {
    None,
    Low,
    Fair,
    Good,
    Excellent
}
