import {URL_BASE} from "../resources/constants";

const tripUrl = `${URL_BASE}/api/trips`;
const activityUrl = `${URL_BASE}/api/activities`;


const fetchActivitiesForTrip = (tid) => {
    return fetch(`${tripUrl}/${tid}/activities`, {
        credentials: 'include'
    })
        .then(response => {
            return response.json()
        })
};

const createActivity = (tid, activity) => {
    return fetch(`${tripUrl}/${tid}/activities`, {
        method: 'POST',
        body: JSON.stringify({tripId: tid, title: 'New Activity'}),
        headers: {
            'content-type': 'application/json'
        },
        credentials: 'include'
    })
        .then(response => response.json())
}

const deleteActivity = (aid) => {
    return fetch(`${activityUrl}/${aid}`, {
        method: 'DELETE',
        credentials: 'include'
    })
        .then(response => {
            return response.json()
        })
};

const updateActivity = (aid, newActivity) =>
    fetch(`${activityUrl}/${aid}`, {
        method: "PUT",
        body: JSON.stringify(newActivity),
        headers: {
            "content-type": "application/json"
        }
    })
        .then(response => response.json());



export default {
    fetchActivitiesForTrip,
    createActivity,
    deleteActivity,
    updateActivity
}
