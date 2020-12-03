const cityUrl = 'http://localhost:3000/api/cities';
const userUrl = 'http://localhost:3000/api/users';

export const fetchCitiesForUser = (uid) => {
    return fetch(`${userUrl}/${uid}/cities`)
        .then(response => {
            return response.json()
        })
};

export const fetchCityById = (cid) => {
    return fetch(`${cityUrl}/${cid}`)
        .then(response => {
            return response.json()
        })
};

export default {
    fetchCitiesForUser,
    fetchCityById
}
