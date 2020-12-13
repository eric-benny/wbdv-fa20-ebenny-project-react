import {fetchAutofillCities, fetchCities} from "../../services/cityService";

export const CITY_AUTOFILL = 'CITY_AUTOFILL';
export const CLEAR_CITY_AUTOFILL = 'CLEAR_CITY_AUTOFILL';
export const UPDATE_SEARCH_CITY = 'UPDATE_SEARCH_CITY';
export const CITY_RESULTS = 'CITY_RESULTS';
export const CLEAR_CITY_RESULTS = 'CLEAR_CITY_RESULTS';

// TODO: filter unique names, return top 10 or less results
export const updateAutofillCities = (dispatch, citySearchField) => {
    if (citySearchField === '') {
        dispatch({type: CLEAR_CITY_AUTOFILL})
    } else if (citySearchField.length >= 3) {
        fetchAutofillCities(citySearchField)
            .then(results => dispatch({type: CITY_AUTOFILL, cities: results.geonames}))
    }
}

export const updateSearchCity = (dispatch, searchCity) => {
    dispatch({type: UPDATE_SEARCH_CITY, searchCity})
}

export const clearCityResults = (dispatch) => {
    dispatch({type: CLEAR_CITY_RESULTS})
}

export const executeCitySearch = (dispatch, city) => {
    fetchCities(city)
        .then(results => dispatch({type: CITY_RESULTS, cities: results.geonames}))
}

