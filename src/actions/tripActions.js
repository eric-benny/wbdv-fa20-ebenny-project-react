import userTripService from "../services/userTripService";

export const FETCH_TRIP = 'FETCH_TRIP';
export const FETCH_TRIPS_FOR_USER = 'FETCH_TRIPS_FOR_USER';
export const CLEAR_TRIPS_FOR_USER = 'CLEAR_TRIPS_FOR_USER';
export const DELETE_TRIP = 'DELETE_TRIP';
export const CREATE_TRIP = 'CREATE_TRIP';
export const UPDATE_TRIP = 'UPDATE_TRIP';
export const SAVE_TRIP = 'SAVE_TRIP';
export const FETCH_TRIPS_ATTENDING_FOR_USER = 'FETCH_TRIPS_ATTENDING_FOR_USER';

export const fetchTrip = (dispatch, tripId) => {
    userTripService.fetchTripById(tripId)
        .then(trip => dispatch({ type: FETCH_TRIP, trip }));
};

export const fetchTripsForUser = (dispatch, uid) =>
    userTripService.fetchTripsForUser(uid)
        .then(trips => dispatch({type: FETCH_TRIPS_FOR_USER, trips}));

export const fetchTripsAttendingForUser = (dispatch, uid) =>
    userTripService.fetchTripsAttendingForUser(uid)
        .then(trips => dispatch({type: FETCH_TRIPS_ATTENDING_FOR_USER, trips}));

export const clearTripsForUser = (dispatch) =>
    dispatch({ type: CLEAR_TRIPS_FOR_USER });

export const deleteTrip = (dispatch, tid) => {
    userTripService.deleteTrip(tid)
        .then(response => dispatch({ type: DELETE_TRIP, response, tid}))
};

export const createTrip = (dispatch, uid) => {
    userTripService.createTrip(uid)
        .then(trip => dispatch({type: CREATE_TRIP, trip}))
};

export const addCityToTrip = (dispatch, tid, cid) => {
    userTripService.addCityToTrip(tid, cid)
        .then(response =>
                  fetchTrip(dispatch, tid))
};

export const updateTrip = (dispatch, trip) => {
    dispatch({type: UPDATE_TRIP, trip})
};

export const saveTrip = (dispatch, tid, trip) => {
    userTripService.updateTrip(tid, trip)
        .then(response => dispatch({type: SAVE_TRIP, response}))
};

export const addAttendeeToTrip = (dispatch, tid, uid) => {
    userTripService.addAttendeeToTrip(tid, uid)
        .then(response =>
                  fetchTrip(dispatch, tid))
};
