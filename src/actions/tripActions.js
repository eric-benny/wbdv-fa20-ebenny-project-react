import userTripService from "../services/userTripService";

export const FETCH_TRIP = 'FETCH_TRIP';
export const FETCH_TRIPS_FOR_USER = 'FETCH_TRIPS_FOR_USER';
export const CLEAR_TRIPS_FOR_USER = 'CLEAR_TRIPS_FOR_USER';

export const fetchTrip = (dispatch, tripId) => {
    userTripService.fetchTripById(tripId)
        .then(trip => dispatch({ type: FETCH_TRIP, trip }));
}


export const fetchTripsForUser = (dispatch, uid) =>
    userTripService.fetchTripsForUser(uid)
        .then(trips => dispatch({type: FETCH_TRIPS_FOR_USER, trips}))

export const clearTripsForUser = (dispatch) =>
    dispatch({ type: CLEAR_TRIPS_FOR_USER })
