import userCityService from "../../services/userCityService";
import cityService from "../../services/cityService"

export const ADD_CITY = 'ADD_CITY';
export const FETCH_CITY = 'FETCH_CITY';
export const FETCH_CITY_INFO = 'FETCH_CITY_INFO';
export const FIND_CITIES_FOR_TRIP = 'FIND_CITIES_FOR_TRIP';
export const FETCH_CITIES_FOR_USER = 'FETCH_CITIES_FOR_USER';
export const CLEAR_CITIES_FOR_USER = 'CLEAR_CITIES_FOR_USER';
export const DELETE_CITY = 'DELETE_CITY';
export const UPDATE_CITY = 'UPDATE_CITY';
export const SAVE_CITY = 'SAVE_CITY';

export const addCity = (dispatch, uid, city) => {
    userCityService.createCity(uid, city)
        .then(newCity => dispatch({ type: ADD_CITY, newCity }))
};

export const fetchCity = (dispatch, cityId) => {
    userCityService.fetchCityById(cityId)
        .then(city => {
            cityService.fetchCity(city.infoId)
                .then(cityInfo => dispatch({type: FETCH_CITY_INFO, cityInfo}));
            dispatch({type: FETCH_CITY, city})
        })
};

export const fetchCitiesForTrip = (dispatch, tripId) => {
    dispatch({ type: FIND_CITIES_FOR_TRIP, tripId })
};

export const fetchCitiesForUser = (dispatch, uid) =>
    userCityService.fetchCitiesForUser(uid)
        .then(cities => dispatch({type: FETCH_CITIES_FOR_USER, cities}));

export const clearCitiesForUser = (dispatch) => {
    dispatch({ type: CLEAR_CITIES_FOR_USER })
};

export const deleteCity = (dispatch, cid) => {
    userCityService.deleteCity(cid)
        .then(response => dispatch({ type: DELETE_CITY, response, cid}))
};

export const updateCity = (dispatch, city) => {
    dispatch({type: UPDATE_CITY, city})
};

export const saveCity = (dispatch, cid, city) => {
    userCityService.updateCity(cid, city)
        .then(response => dispatch({type: SAVE_CITY, response}))
};
