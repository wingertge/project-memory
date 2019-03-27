import {ValidatorMap} from "../../enhancers"
import {longerThan, notEmpty, shorterThan} from "../../util/validationUtils"
import {FormTypes} from "./types"

export const deckPropsValidators: ValidatorMap<FormTypes> = {
    name: [
        {fun: notEmpty, message: "Name can't be empty"},
        {fun: longerThan(2), message: "Name needs to be at least 3 characters long"},
        {fun: shorterThan(25), message: "Name needs to be 24 characters or less"}
    ]
}
