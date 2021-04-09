// Code taken from https://github.com/carlosvicient/on-campus-tracker/blob/feature/fullstackv1/src/helpers/storage.js
const LOCAL_STORAGE_PREFIX = 'plants-';

function getToken() {
    return JSON.parse(localStorage.getItem(`${LOCAL_STORAGE_PREFIX}token`));
}

function getAuth() {
    return JSON.parse(localStorage.getItem(`${LOCAL_STORAGE_PREFIX}isAuth`));
}

function getRole() {
    return JSON.parse(localStorage.getItem(`${LOCAL_STORAGE_PREFIX}role`));
}

function setToken(token) {
    localStorage.setItem(`${LOCAL_STORAGE_PREFIX}token`, JSON.stringify(token));
}

function setAuth(isAuth) {
    localStorage.setItem(`${LOCAL_STORAGE_PREFIX}isAuth`, JSON.stringify(isAuth));
}

function setRole(role) {
    localStorage.setItem(`${LOCAL_STORAGE_PREFIX}role`, JSON.stringify(role));
}

function clearLocalStorage() {
    localStorage.removeItem(`${LOCAL_STORAGE_PREFIX}token`);
    localStorage.removeItem(`${LOCAL_STORAGE_PREFIX}isAuth`);
    localStorage.removeItem(`${LOCAL_STORAGE_PREFIX}role`);
}

export { getToken, setToken, getAuth, setAuth, getRole, setRole, clearLocalStorage };