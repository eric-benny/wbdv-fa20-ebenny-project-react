const placeUrl = 'http://localhost:3000/api/places';
const userUrl = 'http://localhost:3000/api/users';
const cityUrl = 'http://localhost:3000/api/cities';

export const fetchPlacesForUser = (uid) => {
    return fetch(`${userUrl}/${uid}/places`, {
        credentials: 'include'
    })
        .then(response => {
            return response.json()
        })
};

export const fetchPlacesForCity = (cid) => {
    return fetch(`${cityUrl}/${cid}/places`, {
        credentials: 'include'
    })
        .then(response => {
            return response.json()
        })
};

export const fetchPlaceById = (pid) => {
    return fetch(`${placeUrl}/${pid}`, {
        credentials: 'include'
    })
        .then(response => {
            return response.json()
        })
};

export const createPlace = (uid, cid, place) => {
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

export const deletePlace = (pid) => {
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

export const addTripToPlace = (pid, tid) =>
    fetch(`${placeUrl}/${pid}/trips/${tid}`, {
        method: "PUT",
        headers: {
            "content-type": "application/json"
        }
    })
        .then(response => response.json());

export default {
    fetchPlacesForUser,
    fetchPlaceById,
    createPlace,
    fetchPlacesForCity,
    deletePlace,
    updatePlace,
    addTripToPlace
}
