import {FETCH_TRIP, FETCH_TRIPS_FOR_USER} from "../actions/tripActions";

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
        default:
            return state
    }
};

export default tripReducer
