// Some code has been taken from https://github.com/carlosvicient/on-campus-tracker/blob/feature/fullstackv1/src/api/users.js
//import axios from 'axios';
import axios from './axios';

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
const fetchUser = () => {
    return axios.get('/user');
}

const updateMyProfile = ({ name, surname, password, oldPassword}) => {
    return axios.patch('/user', { name, surname, password, oldPassword });
}

//Admins
const createUser = (headers, { name, surname, email, role, password }) => {
    return axios.post('/dashboard', { name, surname, email, role, password });
}

const fetchAllUsers = () => {
    return axios.get('/dashboard');
}

const updateUser = ({ place, selectedUser, name, surname, role, email }) => {
    return axios.patch('/dashboard', { place, selectedUser, name, surname, role, email });
}

const deleteUser = ({ email }) => {
    return axios.delete('/dashboard', { data: { email } });
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
