import userPlaceService from "../../services/userPlaceService";
import placeService from "../../services/placeService"
import userCityService from "../../services/userCityService";
import {SAVE_CITY, UPDATE_CITY} from "./cityActions";

export const FIND_PLACES_FOR_CITY = 'FIND_PLACES_FOR_CITY';
export const FETCH_PLACE = 'FETCH_PLACE';
export const FETCH_PLACE_INFO = 'FETCH_PLACE_INFO';
export const ADD_PLACE = 'ADD_PLACE';
export const FETCH_PLACES_FOR_USER = 'FETCH_PLACES_FOR_USER';
export const CLEAR_PLACES_FOR_USER = 'CLEAR_PLACES_FOR_USER';
export const DELETE_PLACE = 'DELETE_PLACE';
export const UPDATE_PLACE = 'UPDATE_PLACE';
export const SAVE_PLACE = 'SAVE_PLACE';

export const fetchPlacesForCity = (dispatch, cityId) => {
    userPlaceService.fetchPlacesForCity(cityId)
        .then(places => dispatch({type: FIND_PLACES_FOR_CITY, places}))
}

export const fetchPlace = (dispatch, placeId) => {
    userPlaceService.fetchPlaceById(placeId)
        .then(place => {
            // placeService.fetchPlace(place.infoId)
            //     .then(placeInfo => dispatch({type: FETCH_PLACE_INFO, placeInfo}));
            dispatch({type: FETCH_PLACE, place})
        })
}

export const addPlace = (dispatch, uid, cid, place) => {
    if (!cid || cid === '') {
        alert("Choose a city from the dropdown to add the place to")
    } else {
        userPlaceService.createPlace(uid, cid, place)
            .then(newPlace => dispatch({type: ADD_PLACE, newPlace}))
    }
};

export const fetchPlacesForUser = (dispatch, uid) =>
    userPlaceService.fetchPlacesForUser(uid)
        .then(places => dispatch({type: FETCH_PLACES_FOR_USER, places}))

export const clearPlacesForUser = (dispatch) => {
    dispatch({ type: CLEAR_PLACES_FOR_USER })
}

export const deletePlace = (dispatch, pid) => {
    userPlaceService.deletePlace(pid)
        .then(response => dispatch({ type: DELETE_PLACE, response, pid}))
}

export const updatePlace = (dispatch, place) => {
    dispatch({type: UPDATE_PLACE, place})
};

export const savePlace = (dispatch, pid, place) => {
    userPlaceService.updatePlace(pid, place)
        .then(response => dispatch({type: SAVE_PLACE, response}))
}
