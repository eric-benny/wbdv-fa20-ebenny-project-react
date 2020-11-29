import {
    ADD_CITY,
    FETCH_CITIES_FOR_USER,
    FETCH_CITY,
    FIND_CITIES_FOR_TRIP
} from "../actions/locations/cityActions";

const tempCitiesForTrip = [
    {
        id: 11875708,
        places: [123,789]
    }
]

const initialState = {
    userCities: [],
    selectedCity: {},
    citiesForTrip: []
}

const cityReducer = (state=initialState, action) => {
    switch(action.type) {
        case ADD_CITY:
            return {
                ...state,
                userCities: [ ...state.userCities, action.city ]
            };
        case FETCH_CITY:
            return {
                ...state,
                selectedCity: state.userCities.find(city => city.id === action.cityId)
            };
        case FETCH_CITIES_FOR_USER:
            return {
                ...state,
                userCities: action.cities
            }
        case FIND_CITIES_FOR_TRIP:
            return {
                ...state,
                citiesForTrip: state.userCities.filter(city => tempCitiesForTrip.some(tripCity => tripCity.id === city.id))
            }
        default:
            return state
    }
};

export default cityReducer
