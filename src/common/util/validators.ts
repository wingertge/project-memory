import {longerThan, noInvalidCharacters, notEmpty, shorterThan} from "./validationUtils"

export const usernameValidator = [
    {fun: notEmpty, message: "Username can't be empty"},
    {fun: noInvalidCharacters(), message: "Please don't use unicode characters that break display. Thank you."},
    {fun: longerThan(2), message: "Must be at least 3 characters long"},
    {fun: shorterThan(25), message: "Must be 18 characters or less"}
]
