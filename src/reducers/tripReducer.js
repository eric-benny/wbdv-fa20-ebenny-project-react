import {
    FETCH_TRIP,
    FETCH_TRIPS_FOR_USER,
    CLEAR_TRIPS_FOR_USER,
    DELETE_TRIP,
    CREATE_TRIP,
    UPDATE_TRIP,
    FETCH_TRIPS_ATTENDING_FOR_USER
} from "../actions/tripActions";

const initialState = {
    userTrips: [],
    userTripsAttending: [],
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
        case FETCH_TRIPS_ATTENDING_FOR_USER:
            return {
                ...state,
                userTripsAttending: action.trips
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
        case CREATE_TRIP:
            return {
                ...state,
                userTrips: [...state.userTrips, action.trip]
            };
        case UPDATE_TRIP:
            return {
                ...state,
                selectedTrip: action.trip
            };
        default:
            return state
    }
};

export default tripReducer
