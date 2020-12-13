import {
    FIND_PLACES_FOR_CITY,
    FETCH_PLACE,
    FETCH_PLACES_FOR_USER,
    ADD_PLACE,
    CLEAR_PLACES_FOR_USER,
    DELETE_PLACE, UPDATE_PLACE, CLEAR_PLACES_FOR_CITY, ADD_TRIP_TO_PLACE
} from "../actions/locations/placeActions";
import {UPDATE_CITY} from "../actions/locations/cityActions";

const initialState = {
    userPlaces: [],
    placesForCity: [],
    selectedPlace: {}
}

const placeReducer = (state=initialState, action) => {
    switch(action.type) {
        case FIND_PLACES_FOR_CITY:
            return {
                ...state,
                placesForCity: action.places
            }
        case FETCH_PLACE:
            return {
                ...state,
                selectedPlace: action.place
            }
        case FETCH_PLACES_FOR_USER:
            return {
                ...state,
                userPlaces: action.places
            }
        case ADD_PLACE:
            return {
                ...state,
                userPlaces: [ ...state.userPlaces, action.newPlace ]
            };
        case CLEAR_PLACES_FOR_USER:
            return {
                ...state,
                userPlaces: []
            };
        case CLEAR_PLACES_FOR_CITY:
            return {
                ...state,
                placesForCity: []
            };
        case DELETE_PLACE:
            return {
                ...state,
                userPlaces: state.userPlaces.filter(place => place._id !== action.pid)
            };
        case UPDATE_PLACE:
            return {
                ...state,
                selectedPlace: action.place
            };
        case ADD_TRIP_TO_PLACE:
            return {
                ...state,
                placesForCity: state.placesForCity.map(place => place._id === action.pid ? {...place, trips: [...place.trips, action.tid]}: place)
            };
        default:
            return state
    }
};

export default placeReducer
