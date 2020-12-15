import userService from "../services/userService";

export const FETCH_ACTIVE_USER = 'FETCH_ACTIVE_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const FETCH_ALL_USERS = 'FETCH_ALL_USERS';
export const UPDATE_USER = 'UPDATE_USER';
export const SAVE_USER = 'SAVE_USER';

export const fetchActiveUser = (dispatch) => {
    userService.fetchUser()
        .then(user => {
            console.log(user);
            dispatch({ type: FETCH_ACTIVE_USER, user })
        });
};

export const logoutUser = (dispatch) => {
    userService.logoutUser()
        .then(dispatch({ type: LOGOUT_USER }));
};

export const fetchAllUsers = (dispatch) => {
    userService.fetchUsers()
        .then(users => {
            dispatch({ type: FETCH_ALL_USERS, users })
        });
};

export const updateUser = (dispatch, user) => {
    dispatch({type: UPDATE_USER, user})
};

export const saveUser = (dispatch, uid, user) => {
    userService.updateUser(uid, user)
        .then(response => dispatch({type: SAVE_USER, response, uid, user}))
};

