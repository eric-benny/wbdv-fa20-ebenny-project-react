import {
    FETCH_ACTIVE_USER,
    FETCH_ALL_USERS,
    LOGOUT_USER,
    SAVE_USER,
    UPDATE_USER
} from "../actions/userActions";

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
        case UPDATE_USER:
            return {
                ...state,
                userDetails: action.user
            }
        case SAVE_USER:
            return {
                ...state,
                allUsers: state.allUsers.map(user => user._id === action.uid ? action.user: user)
            }
        default:
            return state
    }
};

export default userReducer
