import cityService from "../../services/cityService"

export const CITY_AUTOFILL = 'CITY_AUTOFILL';
export const CLEAR_CITY_AUTOFILL = 'CLEAR_CITY_AUTOFILL';
export const UPDATE_SEARCH_CITY = 'UPDATE_SEARCH_CITY';
export const CITY_RESULTS = 'CITY_RESULTS';
export const CLEAR_CITY_RESULTS = 'CLEAR_CITY_RESULTS';

export const updateAutofillCities = (dispatch, citySearchField) => {
    if (citySearchField === '') {
        dispatch({type: CLEAR_CITY_AUTOFILL})
    } else if (citySearchField.length >= 3) {
        cityService.fetchAutofillCities(citySearchField)
            .then(results => {
                const size = 10;
                let resArr = [];
                results.geonames.forEach(function(item){
                    let i = resArr.findIndex(x => x.toponymName === item.toponymName);
                    if(i <= -1){
                        if (resArr.length < 10) {
                            resArr.push(item);
                        }
                    }
                });

                dispatch({type: CITY_AUTOFILL, cities: resArr})
            })
    }
};

export const updateSearchCity = (dispatch, searchCity) => {
    dispatch({type: UPDATE_SEARCH_CITY, searchCity})
};

export const clearCityResults = (dispatch) => {
    dispatch({type: CLEAR_CITY_RESULTS})
};

export const executeCitySearch = (dispatch, city) => {
    cityService.fetchCities(city)
        .then(results => dispatch({type: CITY_RESULTS, cities: results.geonames}))
};

