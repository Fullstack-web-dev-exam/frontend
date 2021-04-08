// Code taken from https://github.com/carlosvicient/on-campus-tracker/blob/feature/fullstackv1/src/helpers/storage.js
const LOCAL_STORAGE_PREFIX = 'plants-';

function getToken() {
    return JSON.parse(localStorage.getItem(`${LOCAL_STORAGE_PREFIX}token`));
}

function getUser() {
    return JSON.parse(localStorage.getItem(`${LOCAL_STORAGE_PREFIX}user`));
}

function setToken(token) {
    localStorage.setItem(`${LOCAL_STORAGE_PREFIX}token`, JSON.stringify(token));
}

function setUser(user) {
    localStorage.setItem(`${LOCAL_STORAGE_PREFIX}user`, JSON.stringify(user));
}

function clearLocalStorage() {
    localStorage.removeItem(`${LOCAL_STORAGE_PREFIX}token`);
    localStorage.removeItem(`${LOCAL_STORAGE_PREFIX}user`);
}

export { getToken, setToken, getUser, setUser, clearLocalStorage };