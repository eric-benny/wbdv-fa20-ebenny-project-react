import {URL_BASE} from "../resources/constants";

const tripUrl = `${URL_BASE}/api/trips`;
const logUrl = `${URL_BASE}/api/logs`;


const fetchLogsForTrip = (tid) => {
    return fetch(`${tripUrl}/${tid}/logs`, {
        credentials: 'include'
    })
        .then(response => {
            return response.json()
        })
};

const createLog = (tid, log) => {
    return fetch(`${tripUrl}/${tid}/logs`, {
        method: 'POST',
        body: JSON.stringify({tripId: tid, title: 'New Log'}),
        headers: {
            'content-type': 'application/json'
        },
        credentials: 'include'
    })
        .then(response => response.json())
}

const deleteLog = (lid) => {
    return fetch(`${logUrl}/${lid}`, {
        method: 'DELETE',
        credentials: 'include'
    })
        .then(response => {
            return response.json()
        })
};

const updateLog = (lid, newLog) =>
    fetch(`${logUrl}/${lid}`, {
        method: "PUT",
        body: JSON.stringify(newLog),
        headers: {
            "content-type": "application/json"
        }
    })
        .then(response => response.json());



export default {
    fetchLogsForTrip,
    createLog,
    deleteLog,
    updateLog
}
