import {FETCH_ACTIVE_USER, LOGOUT_USER} from "../actions/userActions";

const initialState = {
    userDetails: {}
}

const userReducer = (state=initialState, action) => {
    switch(action.type) {
        case FETCH_ACTIVE_USER:
            return {
                ...state,
                userDetails: action.user
            }
        case LOGOUT_USER:
            return {
                ...state,
                userDetails: {}
            }
        default:
            return state
    }
};

export default userReducer
