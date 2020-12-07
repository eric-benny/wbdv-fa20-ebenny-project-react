const userUrl = 'http://localhost:3000/api/users';

export const loginUser = (username, password) => {
    return fetch(`${userUrl}/login`, {
        method: 'POST',
        body: JSON.stringify({
                                 username,
                                 password
                             }),
        headers: {
            'content-type': 'application/json'
        }
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
        }
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


export default {
    loginUser,
    registerUser
}
