export const FIND_PLACES_FOR_CITY = 'FIND_PLACES_FOR_CITY';
export const FETCH_PLACE = 'FETCH_PLACE';

export const fetchPlacesForCity = (dispatch, cityId) => {
    dispatch({type: FIND_PLACES_FOR_CITY, cityId})
}

export const fetchPlace = (dispatch, placeId) => {
    dispatch({type: FETCH_PLACE, placeId})
}
