import userLogService from "../services/userLogService";

export const ADD_LOG = 'ADD_LOG';
export const FETCH_LOG = 'FETCH_LOG';
export const FETCH_LOG_INFO = 'FETCH_LOG_INFO';
export const FIND_LOGS_FOR_TRIP = 'FIND_LOGS_FOR_TRIP';
export const FETCH_LOGS_FOR_USER = 'FETCH_LOGS_FOR_USER';
export const CLEAR_LOGS_FOR_USER = 'CLEAR_LOGS_FOR_USER';
export const DELETE_LOG = 'DELETE_LOG';
export const UPDATE_LOG = 'UPDATE_LOG';
export const SAVE_LOG = 'SAVE_LOG';

export const addLog = (dispatch, tid) => {
    userLogService.createLog(tid)
        .then(newLog => dispatch({ type: ADD_LOG, newLog }))
};

export const fetchLogsForTrip = (dispatch, tripId) => {
    userLogService.fetchLogsForTrip(tripId)
        .then(logs => dispatch({ type: FIND_LOGS_FOR_TRIP, logs }))
}

export const deleteLog = (dispatch, lid) => {
    userLogService.deleteLog(lid)
        .then(response => dispatch({ type: DELETE_LOG, response, lid}))
}

export const updateLog = (dispatch, lid, log) => {
    userLogService.updateLog(lid, log)
        .then(response => dispatch({type: UPDATE_LOG, response, log}))
};

