import {} from "../actions/locations/placeActions";
import {FIND_PLACES_FOR_CITY, FETCH_PLACE} from "../actions/locations/placeActions";

const initialState = {
    userPlaces: [
        {
            id:123,
            name:"The Louvre",
            address: "1 Museum Way",
            cityId: 11875708,
            longitude:"2.37077",
            latitude:"48.79591"
        },
        {
            id:456,
            name:"Eiffel Tower",
            address: "1 Tower Drive",
            cityId: 11875708,
            longitude:"2.37077",
            latitude:"48.79591"
        },
        {
            id:789,
            name:"Arc de Triomphe",
            address: "1 Monument Lane",
            cityId: 11875708,
            longitude:"2.37077",
            latitude:"48.79591"
        },
        {
            id:34897,
            name:"Naval Academy",
            address: "1 Navy Place",
            cityId: 4347242,
            longitude:"2.37077",
            latitude:"48.79591"
        }
    ],
    placesForCity: [],
    selectedPlace: {}
}

const placeReducer = (state=initialState, action) => {
    switch(action.type) {
        case FIND_PLACES_FOR_CITY:
            return {
                ...state,
                placesForCity: state.userPlaces.filter(place => place.cityId === action.cityId)
            }
        case FETCH_PLACE:
            return {
                ...state,
                selectedPlace: state.userPlaces.find(place => place.id === action.placeId)
            }
        default:
            return state
    }
};

export default placeReducer
