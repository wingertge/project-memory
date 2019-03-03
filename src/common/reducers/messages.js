import {ADD_MESSAGE} from "../constants"
import DefaultState from "../DefaultState"

// when using multiple reducers, the "state" is only a slice of the messagesState
// so I do not return { ...state, messages: concat(state.messages, ['new']) };
// just the array that is messages
const messagesReducer = (messagesState = DefaultState.messages, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            return messagesState.push(action.payload)
        default:
            return messagesState
    }
}

export default messagesReducer