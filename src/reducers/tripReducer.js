import {
    FETCH_TRIP,
    FETCH_TRIPS_FOR_USER,
    CLEAR_TRIPS_FOR_USER,
    DELETE_TRIP
} from "../actions/tripActions";
import {DELETE_PLACE} from "../actions/locations/placeActions";

const initialState = {
    userTrips: [],
    selectedTrip: {}
}

const tripReducer = (state=initialState, action) => {
    switch(action.type) {
        case FETCH_TRIP:
            return {
                ...state,
                selectedTrip: action.trip
            }
        case FETCH_TRIPS_FOR_USER:
            return {
                ...state,
                userTrips: action.trips
            }
        case CLEAR_TRIPS_FOR_USER:
            return {
                ...state,
                userTrips: []
            }
        case DELETE_TRIP:
            return {
                ...state,
                userTrips: state.userTrips.filter(trip => trip._id !== action.tid)
            };
        default:
            return state
    }
};

export default tripReducer
