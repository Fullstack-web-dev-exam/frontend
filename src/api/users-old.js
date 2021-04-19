// Some code has been taken from https://github.com/carlosvicient/on-campus-tracker/blob/feature/fullstackv1/src/api/users.js
//import axios from 'axios';
import axios from './axios';
require('./axios-helper');

// Refresh-token
const tokenRefresh = () => {
    return axios.post('/refresh-token');
};

// Anonymous
const login = (email, password) => {
    return axios.post('/login', { email, password });
};

const forgot = (email) => {
    return axios.post('/reset_password', email);
}

// Gardeners
const fetchUser = (headers) => {
    return axios.get('/user', headers);
}

const updateMyProfile = (headers, { name, surname, password, oldPassword}) => {
    return axios.patch('/user', { name, surname, password, oldPassword }, headers);
}

//Admins
const createUser = (headers, { name, surname, email, role, password }) => {
    return axios.post('/dashboard', { name, surname, email, role, password }, headers);
}

const fetchAllUsers = (headers) => {
    return axios.get('/dashboard', headers);
}

const updateUser = (headers, { place, selectedUser, name, surname, role, email }) => {
    return axios.patch('/dashboard', { place, selectedUser, name, surname, role, email }, headers);
}

const deleteUser = (headers, { email }) => {
    return axios.delete('/dashboard', { data: { email }, headers });
}

export {
    tokenRefresh,
    login,
    forgot,
    updateMyProfile,
    createUser,
    fetchUser,
    updateUser,
    deleteUser,
    fetchAllUsers
}
