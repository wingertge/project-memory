import {URL_INPUT_TEXT} from "../constants"
import DefaultState from "../DefaultState"

const uiReducer = (uiState = DefaultState.downloader, action) => {
    switch (action.type) {
        case URL_INPUT_TEXT:
            return uiState.set("urlInputText", action.payload)
        default:
            return uiState
    }
}

export default uiReducer