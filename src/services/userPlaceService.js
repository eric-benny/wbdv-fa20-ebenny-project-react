import {URL_BASE} from "../resources/constants";

const cityUrl = `${URL_BASE}/api/cities`;
const userUrl = `${URL_BASE}/api/users`;
const placeUrl = `${URL_BASE}/api/places`;


const fetchPlacesForUser = (uid) => {
    return fetch(`${userUrl}/${uid}/places`, {
        credentials: 'include'
    })
        .then(response => {
            return response.json()
        })
};

const fetchPlacesForCity = (cid) => {
    return fetch(`${cityUrl}/${cid}/places`, {
        credentials: 'include'
    })
        .then(response => {
            return response.json()
        })
};

const fetchPlaceById = (pid) => {
    return fetch(`${placeUrl}/${pid}`, {
        credentials: 'include'
    })
        .then(response => {
            return response.json()
        })
};

const createPlace = (uid, cid, place) => {
    return fetch(`${userUrl}/${uid}/cities/${cid}/places`, {
        method: 'POST',
        body: JSON.stringify(place),
        headers: {
            'content-type': 'application/json'
        },
        credentials: 'include'
    })
        .then(response => response.json())
}

const deletePlace = (pid) => {
    return fetch(`${placeUrl}/${pid}`, {
        method: 'DELETE',
        credentials: 'include'
    })
        .then(response => {
            return response.json()
        })
};

export const updatePlace = (pid, newPlace) =>
    fetch(`${placeUrl}/${pid}`, {
        method: "PUT",
        body: JSON.stringify(newPlace),
        headers: {
            "content-type": "application/json"
        }
    })
        .then(response => response.json());

const addTripToPlace = (pid, tid) =>
    fetch(`${placeUrl}/${pid}/trips/${tid}`, {
        method: "PUT",
        headers: {
            "content-type": "application/json"
        }
    })
        .then(response => response.json());

const fetchTopPlaces = () => {
    return fetch(`${placeUrl}/aggregate/top`, {
        credentials: 'include'
    })
        .then(response => {
            return response.json()
        })
};

export default {
    fetchPlacesForUser,
    fetchPlaceById,
    createPlace,
    fetchPlacesForCity,
    deletePlace,
    updatePlace,
    addTripToPlace,
    fetchTopPlaces
}
