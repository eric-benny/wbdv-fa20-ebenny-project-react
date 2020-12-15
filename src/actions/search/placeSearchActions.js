import {fetchAutofillPlaces, fetchPlaces} from "../../services/placeService";

export const PLACE_AUTOFILL = 'PLACE_AUTOFILL';
export const CLEAR_PLACE_AUTOFILL = 'CLEAR_PLACE_AUTOFILL';
export const UPDATE_SEARCH_PLACE = 'UPDATE_SEARCH_PLACE';
export const PLACE_RESULTS = 'PLACE_RESULTS';
export const CLEAR_PLACE_RESULTS = 'CLEAR_PLACE_RESULTS';

export const updateAutofillPlaces = (dispatch, placeSearchField) => {
    if (placeSearchField === '') {
        dispatch({type: CLEAR_PLACE_AUTOFILL})
    } else if (placeSearchField.length >= 3) {
        fetchAutofillPlaces(placeSearchField)
            .then(results => dispatch({type: PLACE_AUTOFILL, places: results}))
    }
};

export const updateSearchPlace = (dispatch, searchPlace) => {
    dispatch({type: UPDATE_SEARCH_PLACE, searchPlace})
};

export const clearPlaceResults = (dispatch) => {
    dispatch({type: CLEAR_PLACE_RESULTS})
};

export const executePlaceSearch = (dispatch, place) => {
    fetchPlaces(place)
        .then(results => dispatch({type: PLACE_RESULTS, places: results}))
};

