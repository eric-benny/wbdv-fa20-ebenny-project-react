import {URL_BASE} from "../resources/constants";

const userUrl = `${URL_BASE}/api/users`;
const tripUrl = `${URL_BASE}/api/trips`;

const fetchTripsForUser = (uid) => {
    return fetch(`${userUrl}/${uid}/trips`, {
        credentials: 'include'
    })
        .then(response => {
            return response.json()
        })
};

const fetchTripsAttendingForUser = (uid) => {
    return fetch(`${userUrl}/${uid}/trips/attending`, {
        credentials: 'include'
    })
        .then(response => {
            return response.json()
        })
};

const fetchTripById = (tid) => {
    return fetch(`${tripUrl}/${tid}`, {
        credentials: 'include'
    })
        .then(response => {
            return response.json()
        })
};

const deleteTrip = (tid) => {
    return fetch(`${tripUrl}/${tid}`, {
        method: 'DELETE',
        credentials: 'include'
    })
        .then(response => {
            return response.json()
        })
};

const createTrip = (uid) => {
    return fetch(`${userUrl}/${uid}/trips`, {
        method: 'POST',
        credentials: 'include'
    })
        .then(response => {
            return response.json()
        })
};

const addCityToTrip = (tid, cid) => {
    return fetch(`${tripUrl}/${tid}/cities/${cid}`, {
        method: 'PUT',
        credentials: 'include'
    })
        .then(response => {
            return response.json()
        })
};

const updateTrip = (tid, newTrip) =>
    fetch(`${tripUrl}/${tid}`, {
        method: "PUT",
        body: JSON.stringify(newTrip),
        headers: {
            "content-type": "application/json"
        }
    })
        .then(response => response.json());

const addAttendeeToTrip = (tid, uid) => {
    return fetch(`${tripUrl}/${tid}/users/${uid}`, {
        method: 'PUT',
        credentials: 'include'
    })
        .then(response => {
            return response.json()
        })
};

const fetchRecentTrips = () => {
    return fetch(`${tripUrl}/aggregate/recent`, {
        credentials: 'include'
    })
        .then(response => {
            return response.json()
        })
};

export default {
    fetchTripsForUser,
    fetchTripById,
    deleteTrip,
    createTrip,
    addCityToTrip,
    updateTrip,
    addAttendeeToTrip,
    fetchTripsAttendingForUser,
    fetchRecentTrips
}
