import {
    CITY_AUTOFILL,
    CITY_RESULTS,
    CLEAR_CITY_AUTOFILL,
    UPDATE_SEARCH_CITY,
    CLEAR_CITY_RESULTS
} from "../actions/search/citySearchActions";

import {
    CLEAR_PLACE_AUTOFILL,
    PLACE_AUTOFILL,
    UPDATE_SEARCH_PLACE,
    PLACE_RESULTS, CLEAR_PLACE_RESULTS, FETCH_PLACE_DETAIL
} from "../actions/search/placeSearchActions";

const initialState = {
    autofillCities: [],
    searchCity: '',
    citySearchResults: [],
    autofillPlaces: [],
    searchPlace: '',
    placeSearchResults: [],
    placeDetail: {}
}

const searchReducer = (state=initialState, action) => {
    switch(action.type) {
        case CITY_AUTOFILL:
            return {
                ...state,
                autofillCities: action.cities
            };
        case PLACE_AUTOFILL:
            return {
                ...state,
                autofillPlaces: action.places
            };
        case CLEAR_CITY_AUTOFILL:
            return {
                ...state,
                autofillCities: []
            };
        case CLEAR_PLACE_AUTOFILL:
            return {
                ...state,
                autofillPlaces: []
            };
        case CLEAR_CITY_RESULTS:
            return {
                ...state,
                citySearchResults: []
            };
        case CLEAR_PLACE_RESULTS:
            return {
                ...state,
                placeSearchResults: []
            };
        case UPDATE_SEARCH_CITY:
            return {
                ...state,
                searchCity: action.searchCity
            };
        case UPDATE_SEARCH_PLACE:
            return {
                ...state,
                searchPlace: action.searchPlace
            };
        case CITY_RESULTS:
            return {
                ...state,
                citySearchResults: action.cities.map(city => (
                    {
                        id: city.geonameId,
                        name: city.toponymName,
                        population: city.population,
                        country: city.countryName,
                        longitude: city.lng,
                        latitude: city.lat,
                        otherName: city.name,
                        state: `${city.adminCodes1 ? city.adminCodes1.ISO3166_2: "N/A"}`
                    })
                )};
        case PLACE_RESULTS:
            return {
                ...state,
                placeSearchResults: action.places.map(place => {
                    let osm_type = '';
                    switch (place.osm_type) {
                        case 'way':
                            osm_type = 'W';
                            break;
                        case 'node':
                            osm_type = 'N';
                            break;
                        case 'relation':
                            osm_type = 'R';
                            break;
                        default:
                            break;
                    }
                    return {
                        id: place.osm_id,
                        idType: osm_type,
                        name: place.namedetails.name,
                        class: place.class,
                        type: place.type,
                        details: place.display_name,
                        icon: place.icon
                    }
                })
                };
        case FETCH_PLACE_DETAIL:
            return {
                ...state,
                placeDetail: action.place
            };
        default:
            return state
    }
};

export default searchReducer
