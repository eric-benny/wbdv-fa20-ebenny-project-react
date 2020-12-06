import {
    CITY_AUTOFILL,
    CITY_RESULTS,
    CLEAR_CITY_AUTOFILL,
    UPDATE_SEARCH_CITY
} from "../actions/search/citySearchActions";

const initialState = {
    autofillCities: [],
    searchCity: '',
    searchResults: []
}

const searchReducer = (state=initialState, action) => {
    switch(action.type) {
        case CITY_AUTOFILL:
            return {
                ...state,
                autofillCities: action.cities
            };
        case CLEAR_CITY_AUTOFILL:
            return {
                ...state,
                autofillCities: []
            };
        case UPDATE_SEARCH_CITY:
            return {
                ...state,
                searchCity: action.searchCity
            };
        case CITY_RESULTS:
            return {
                ...state,
                searchResults: action.cities.map(city => (
                    {
                        id: city.geonameId,
                        name: city.toponymName,
                        population: city.population,
                        country: city.countryName,
                        longitude: city.lng,
                        latitude: city.lat,
                        otherName: city.name,
                        state: city.adminCodes1.ISO3166_2
                    })
                )};
        default:
            return state
    }
};

export default searchReducer
