import userService from "../services/userService";

export const FETCH_ACTIVE_USER = 'FETCH_ACTIVE_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const FETCH_ALL_USERS = 'FETCH_ALL_USERS';

export const fetchActiveUser = (dispatch) => {
    userService.fetchUser()
        .then(user => {
            console.log(user)
            dispatch({ type: FETCH_ACTIVE_USER, user })
        });
}

export const logoutUser = (dispatch) => {
    userService.logoutUser()
        .then(dispatch({ type: LOGOUT_USER }));
}

export const fetchAllUsers = (dispatch) => {
    userService.fetchUsers()
        .then(users => {
            dispatch({ type: FETCH_ALL_USERS, users })
        });
}

