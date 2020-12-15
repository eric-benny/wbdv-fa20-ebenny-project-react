import {URL_BASE} from "../resources/constants";

const cityUrl = `${URL_BASE}/api/cities`;
const userUrl = `${URL_BASE}/api/users`;

const fetchCitiesForUser = (uid) => {
    return fetch(`${userUrl}/${uid}/cities`, {
        credentials: 'include'
    })
        .then(response => {
            return response.json()
        })
};

const fetchCityById = (cid) => {
    return fetch(`${cityUrl}/${cid}`, {
        credentials: 'include'
    })
        .then(response => {
            return response.json()
        })
};

const createCity = (uid, city) => {
    return fetch(`${userUrl}/${uid}/cities`, {
        method: 'POST',
        body: JSON.stringify(city),
        headers: {
            'content-type': 'application/json'
        },
        credentials: 'include'
    })
        .then(response => response.json())
}

const deleteCity = (cid) => {
    return fetch(`${cityUrl}/${cid}`, {
        method: 'DELETE',
        credentials: 'include'
    })
        .then(response => {
            return response.json()
        })
};

const updateCity = (cid, newCity) =>
    fetch(`${cityUrl}/${cid}`, {
        method: "PUT",
        body: JSON.stringify(newCity),
        headers: {
            "content-type": "application/json"
        }
    })
        .then(response => response.json());

const fetchTopCities = () => {
    return fetch(`${cityUrl}/aggregate/top`, {
        credentials: 'include'
    })
        .then(response => {
            return response.json()
        })
};

export default {
    fetchCitiesForUser,
    fetchCityById,
    createCity,
    deleteCity,
    updateCity,
    fetchTopCities
}
