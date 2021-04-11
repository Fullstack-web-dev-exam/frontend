// Some code has been taken from https://github.com/carlosvicient/on-campus-tracker/blob/feature/fullstackv1/src/api/users.js
import axios from 'axios';

// Anonymous users can do this
const login = (email, password) => {
    return axios.post('/login', { email, password });
};

const forgot = (email) => {
    return axios.post('/reset_password', email);
}

// Logged in users can do this
const fetchUser = (headers) => {
    return axios.get('/user', headers);
}

const updateMyProfile = (headers, { name, surname, password, oldPassword}) => {
    return axios.patch('/user', { name, surname, password, oldPassword }, headers);
}

//Admins
const createUser = (headers, { name, surname, email, role, password }) => {
    console.log({ name, surname, email, role, password });
    return axios.post('/dashboard', { name, surname, email, role, password }, headers);
}

const fetchAllUsers = (headers) => {
    return axios.get('/dashboard', headers);
}

const updateUser = (headers, { email, name, surname, role, newEmail }) => {
    return axios.patch('/user', { email, name, surname }, headers);
}

const deleteUser = (headers, { email }) => {
    return axios.delete('/dashboard', { email, headers });
}

export {
    login,
    forgot,
    updateMyProfile,
    createUser,
    fetchUser,
    updateUser,
    deleteUser,
    fetchAllUsers
}
