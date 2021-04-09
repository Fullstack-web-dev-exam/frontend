// Code from https://github.com/carlosvicient/on-campus-tracker/blob/feature/fullstackv1/src/helpers/Auth.js
// and https://codesandbox.io/s/q9m26noky6?file=/src/helpers/AuthContext.js:0-638
import React from 'react';
import { login } from '../api/users';
import { getToken, setToken, getAuth, setAuth, clearLocalStorage } from './storage';

const INITIAL_STATE = { auth: false, token: null, user: null };

const AuthContext = React.createContext();

class AuthProvider extends React.Component {
    state = { ...INITIAL_STATE };

    componentDidMount() {
        const token = getToken();
        const isAuth = getAuth();

        if (token && isAuth) {
            this.setState({ auth: true, token });
        }
    }

    login = async (userData) => {
        const { email, password } = userData;
        try {
            const response = await login(email, password);
            const token = response.data;
            this.setState({ auth: true, token }, () => {
                setToken(token)
                setAuth(true)
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
        //console.log(token.token);
        //console.log(response)
        return response;
    }

    isAuthFunc = () => {
        return this.state.auth || getToken() != null;
    };

    render() {
        return (
            <AuthContext.Provider
                value={{
                    isAuth: this.state.auth,
                    isAuthFunc: this.isAuthFunc,
                    token: this.state.token,
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
