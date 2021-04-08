// Code from https://github.com/carlosvicient/on-campus-tracker/blob/feature/fullstackv1/src/helpers/Auth.js
// and https://codesandbox.io/s/q9m26noky6?file=/src/helpers/AuthContext.js:0-638
import React from 'react';
import { login } from '../api/users';
import { getToken, setToken, getUser, setUser, clearLocalStorage } from './storage';
const INITIAL_STATE = { auth: true, token: null, user: null };

const AuthContext = React.createContext();

class AuthProvider extends React.Component {
    state = { ...INITIAL_STATE };

    componentDidMount() {
        const token = getToken();
        const user = getUser();

        if (token && user) {
            this.setState({ auth: true, token, user });
        }
    }

    login = async (userData) => {
        const { email, password } = userData;
        try {
            const response = await login(email, password);
            const { token, user } = response.data;
            this.setState({ auth: true, token, user }, () => {
                setToken(token)
                setUser(user)
            });
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    };

    logout = () => {
        this.setState({ ...INITIAL_STATE }, () => {
            clearLocalStorage();
        });
    };

    generateHeaders = () => {
        const response = {};
        const token = this.state.token || getToken();

        if (token) {
            response.headers = {
                Authorization: `Bearer ${token}`
            };
        }
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
                    user: this.state.user,
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