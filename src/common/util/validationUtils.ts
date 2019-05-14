import validator from "validator"
import {UNICODE_INVALID_CHARACTERS} from "../hooks/constants"
import {length as unicodeLength} from "stringz"
import {PasswordPolicy, charsets} from "password-sheriff"

export const shorterThan = (length: number) => (str: string) => unicodeLength(str) < length
export const longerThan = (length: number) => (str: string) => unicodeLength(str) > length
export const notEmpty = (str: string) => !validator.isEmpty(str)
export const noInvalidCharacters = (invalidChars = UNICODE_INVALID_CHARACTERS) => (str: string) => !validator.matches(str, invalidChars)
export const isEmail = (str: string) => validator.isEmail(str)
export const isEqualTo = <TProps>(otherPropName: keyof TProps) => (value: any, context: TProps) => value === context[otherPropName] as unknown
export const equalsHook = (other: number) => (value: any, context: any[]) => value === context[other]
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
