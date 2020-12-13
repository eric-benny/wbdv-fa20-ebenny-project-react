import {FETCH_ACTIVE_USER, FETCH_ALL_USERS, LOGOUT_USER} from "../actions/userActions";

const initialState = {
    userDetails: {},
    allUsers: []
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
        case FETCH_ALL_USERS:
            return {
                ...state,
                allUsers: action.users
            }
        default:
            return state
    }
};

export default userReducer
