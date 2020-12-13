import {
    FIND_PLACES_FOR_CITY,
    FETCH_PLACE,
    FETCH_PLACES_FOR_USER,
    ADD_PLACE,
    CLEAR_PLACES_FOR_USER
} from "../actions/locations/placeActions";

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
        default:
            return state
    }
};

export default placeReducer
