const cityUrl = 'http://localhost:3000/api/cities';
const userUrl = 'http://localhost:3000/api/users';

export const fetchCitiesForUser = (uid) => {
    return fetch(`${userUrl}/${uid}/cities`, {
        credentials: 'include'
    })
        .then(response => {
            return response.json()
        })
};

export const fetchCityById = (cid) => {
    return fetch(`${cityUrl}/${cid}`, {
        credentials: 'include'
    })
        .then(response => {
            return response.json()
        })
};

export const createCity = (uid, city) => {
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

export default {
    fetchCitiesForUser,
    fetchCityById,
    createCity
}
