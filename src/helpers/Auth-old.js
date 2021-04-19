// Code from https://github.com/carlosvicient/on-campus-tracker/blob/feature/fullstackv1/src/helpers/Auth.js
// and https://codesandbox.io/s/q9m26noky6?file=/src/helpers/AuthContext.js:0-638
import React from 'react';
import { login } from '../api/users';
import { getToken, setToken, getAuth, setAuth, getRole, setRole, clearLocalStorage } from './storage';
//import { getToken, setToken, getAuth, setAuth, getRole, setRole, clearLocalStorage } from './cookieStorage';

const INITIAL_STATE = { auth: false, token: null, role: null };

const AuthContext = React.createContext();

class AuthProvider extends React.Component {
    state = { ...INITIAL_STATE };

    componentDidMount() {
        const token = getToken();
        const isAuth = getAuth();
        const role = getRole();

        if (token && isAuth) {
            this.setState({ auth: true, token, role });
        }
    }

    login = async (userData) => {
        const { email, password } = userData;
        try {
            const response = await login(email, password);
            const userRole = response.data.role;
            const token = response.data.jwtToken;

            this.setState({ auth: true, token, role: userRole }, () => {
                setToken(token)
                setAuth(true)
                setRole(userRole)
            });
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    };

    logout = () => {
        this.setState({ ...INITIAL_STATE });
        clearLocalStorage();
    };

    generateHeaders = () => {
        const response = {};
        const token = this.state.token || getToken();

        if (token) {
            response.headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.token}`
            };
        }
        return response;
    }

    isAuthFunc = () => {
        return this.state.auth || getToken() != null;
    };

    isRoleSet = () => {
        if(this.state.role === "manager" || getRole() === "manager"){
            return true;
        } else {
            return false;
        }
    }

    render() {
        return (
            <AuthContext.Provider
                value={{
                    isAuth: this.state.auth,
                    isAuthFunc: this.isAuthFunc,
                    token: this.state.token,
                    role: this.state.role,
                    isRoleSet: this.isRoleSet,
                    login: this.login,
                    logout: this.logout,
                    generateHeaders: this.generateHeaders
                }}
            >
                {this.props.children}
            </AuthContext.Provider>
        )
    }
}

const AuthConsumer = AuthContext.Consumer;
export { AuthContext, AuthProvider, AuthConsumer };
