export const ADD_CITY = 'ADD_CITY';
export const FETCH_CITY = 'FETCH_CITY';
export const FIND_CITIES_FOR_TRIP = 'FIND_CITIES_FOR_TRIP';

export const addCity = (dispatch, city) => {
    dispatch({ type: ADD_CITY, city })
};

export const fetchCity = (dispatch, cityId) => {
    dispatch({ type: FETCH_CITY, cityId })
}

export const fetchCitiesForTrip = (dispatch, tripId) => {
    dispatch({ type: FIND_CITIES_FOR_TRIP, tripId })
}
