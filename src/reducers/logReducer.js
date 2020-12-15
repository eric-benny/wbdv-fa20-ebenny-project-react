import {
    ADD_LOG,
    DELETE_LOG,
    FIND_LOGS_FOR_TRIP,
    UPDATE_LOG
} from "../actions/logActions";

const initialState = {
    logs: [],
}

const logReducer = (state=initialState, action) => {
    switch(action.type) {
        case ADD_LOG:
            return {
                ...state,
                logs: [...state.logs, action.newLog]
            }
        case FIND_LOGS_FOR_TRIP:
            return {
                ...state,
                logs: action.logs
            }
        case UPDATE_LOG:
            return {
                ...state,
                logs: state.logs.map(log => log._id === action.log._id ? action.log: log)
            }
        case DELETE_LOG:
            return {
                ...state,
                logs: state.logs.filter(log => log._id !== action.lid)
            }
        default:
            return state
    }
};

export default logReducer
