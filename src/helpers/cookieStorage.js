function getToken() {
    const key = "token";
    let result = document.cookie.match(new RegExp(key + '=([^;]+)'));
    return result;
}

function getAuth() {
    const key = "auth";
    let result = document.cookie.match(new RegExp(key + '=([^;]+)'));
    return result;
}

function getRole() {
    const key = "role";
    let result = document.cookie.match(new RegExp(key + '=([^;]+)'));
    return result;
}

function setToken(token) {
    //console.log(token);
    const key = "token=";
    const cookie = (key, JSON.stringify(token));
    document.cookie = cookie;
}

function setAuth(isAuth) {
    const cookie = `auth=${JSON.stringify(isAuth)};`;
    document.cookie = cookie;
}

function setRole(role) {
    console.log(role);
    const cookie = `role=${JSON.stringify(role)};`;
    document.cookie = cookie;
}

function clearLocalStorage() {
    document.cookie = "token=;expires=Thu, 01, Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "auth=;expires=Thu, 01, Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "role=;expires=Thu, 01, Jan 1970 00:00:00 UTC; path=/;";
}

export { getToken, setToken, getAuth, setAuth, getRole, setRole, clearLocalStorage };