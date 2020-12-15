import userActivityService from "../services/userActivityService";

export const ADD_ACTIVITY = 'ADD_ACTIVITY';
export const FIND_ACTIVITIES_FOR_TRIP = 'FIND_ACTIVITIES_FOR_TRIP';
export const DELETE_ACTIVITY = 'DELETE_ACTIVITY';
export const UPDATE_ACTIVITY = 'UPDATE_ACTIVITY';

export const addActivity = (dispatch, tid) => {
    userActivityService.createActivity(tid)
        .then(newActivity => dispatch({ type: ADD_ACTIVITY, newActivity }))
};

export const fetchActivitiesForTrip = (dispatch, tripId) => {
    userActivityService.fetchActivitiesForTrip(tripId)
        .then(activities => dispatch({ type: FIND_ACTIVITIES_FOR_TRIP, activities }))
};

export const deleteActivity = (dispatch, aid) => {
    userActivityService.deleteActivity(aid)
        .then(response => dispatch({ type: DELETE_ACTIVITY, response, aid}))
};

export const updateActivity = (dispatch, aid, activity) => {
    userActivityService.updateActivity(aid, activity)
        .then(response => dispatch({type: UPDATE_ACTIVITY, response, activity}))
};

