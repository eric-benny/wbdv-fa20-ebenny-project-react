import userActivityService from "../services/userActivityService";

export const ADD_ACTIVITY = 'ADD_ACTIVITY';
export const FETCH_ACTIVITY = 'FETCH_ACTIVITY';
export const FETCH_ACTIVITY_INFO = 'FETCH_ACTIVITY_INFO';
export const FIND_ACTIVITIES_FOR_TRIP = 'FIND_ACTIVITIES_FOR_TRIP';
export const FETCH_ACTIVITIES_FOR_USER = 'FETCH_ACTIVITIES_FOR_USER';
export const CLEAR_ACTIVITIES_FOR_USER = 'CLEAR_ACTIVITIES_FOR_USER';
export const DELETE_ACTIVITY = 'DELETE_ACTIVITY';
export const UPDATE_ACTIVITY = 'UPDATE_ACTIVITY';
export const SAVE_ACTIVITY = 'SAVE_ACTIVITY';

export const addActivity = (dispatch, tid) => {
    userActivityService.createActivity(tid)
        .then(newActivity => dispatch({ type: ADD_ACTIVITY, newActivity }))
};

export const fetchActivitiesForTrip = (dispatch, tripId) => {
    userActivityService.fetchActivitiesForTrip(tripId)
        .then(activities => dispatch({ type: FIND_ACTIVITIES_FOR_TRIP, activities }))
}

export const deleteActivity = (dispatch, aid) => {
    userActivityService.deleteActivity(aid)
        .then(response => dispatch({ type: DELETE_ACTIVITY, response, aid}))
}

export const updateActivity = (dispatch, aid, activity) => {
    userActivityService.updateActivity(aid, activity)
        .then(response => dispatch({type: UPDATE_ACTIVITY, response, activity}))
};

