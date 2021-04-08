// Some code has been taken from https://github.com/carlosvicient/on-campus-tracker/blob/feature/fullstackv1/src/api/users.js
import axios from 'axios';

// Anonymous users can do this
const login = (email, password) => {
    return axios.post('/login', { email, password });
};

// Logged in users can do this
const fetchUser = (headers) => {
    return axios.get('/user/', headers);
}

const updateUser = (headers, params) => {
    return axios.patch('/user/:id', { params }, headers);
}

const deleteUser = (headers, params) => {
    return axios.delete('/user/:id', { params }, headers);
}

// Admins
const fetchAllUsers = (headers) => {
    return axios.get('/dashboard/', headers);
}

export {
    login,
    fetchUser,
    updateUser,
    deleteUser,
    fetchAllUsers
};