const tripUrl = 'http://localhost:3000/api/trips';
const userUrl = 'http://localhost:3000/api/users';


export const fetchTripsForUser = (uid) => {
    return fetch(`${userUrl}/${uid}/trips`, {
        credentials: 'include'
    })
        .then(response => {
            return response.json()
        })
};

export const fetchTripById = (tid) => {
    return fetch(`${tripUrl}/${tid}`, {
        credentials: 'include'
    })
        .then(response => {
            return response.json()
        })
};


export default { fetchTripsForUser, fetchTripById }
