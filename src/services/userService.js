import {URL_BASE} from "../resources/constants";

const userUrl = `${URL_BASE}/api/users`;

export const loginUser = (username, password) => {
    return fetch(`${userUrl}/login`, {
        method: 'POST',
        body: JSON.stringify({
                                 username,
                                 password
                             }),
        headers: {
            'content-type': 'application/json'
        },
        credentials: 'include'
    })
        .then(response => {
            if (response.status === 403) {
                alert("Incorrect Username/Password combination")
                return response.status;
            } else if(response.ok) {
                return response.json()
            } else {
                return response.status;
            }
        })
};

export const registerUser = (user) => {
    return fetch(`${userUrl}/register`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'content-type': 'application/json'
        },
        credentials: 'include'
    })
        .then(response => {
            if (response.status === 403) {
                alert("Username Not Available, Try Another")
                return response.status;
            } else if(response.ok) {
                return response.json()
            } else {
                return response.status;
            }
        })
};

export const logoutUser = () => {
    return fetch(`${userUrl}/logout`, {
        credentials: 'include'
    })
        .then(response => response)
};

export const fetchUser = () => {
    return fetch(`${userUrl}/profile`, {
        credentials: 'include'
    })
        .then(response => response.json())
};

export const fetchUsers = () => {
    return fetch(`${userUrl}`, {
        credentials: 'include'
    })
        .then(response => response.json())
};


export default {
    loginUser,
    registerUser,
    logoutUser,
    fetchUser,
    fetchUsers
}
