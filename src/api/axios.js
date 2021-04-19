import axios from 'axios';
import { tokenRefresh } from './users';
const { storeExpiry, read } = require('../helpers/refresh-token');

// FIKS CORS I BACKEND

console.log("This is the API ", process.env);

let axiosInstance = axios;
if (process.env && process.env.NODE_ENV && process.env.NODE_ENV === 'production') {
    axiosInstance = axios.create({
        withCredentials: true,
        baseURL: process.env.REACT_APP_BACKEND
    });
} else {
    axiosInstance = axios.create();
}

function createAxiosResponseInterceptor(axiosInstance) {
    axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + read('token');

    const refreshToken = async () => {
        const response = await tokenRefresh();

        storeExpiry("token", response.data.jwtToken, true);

        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${response.data.jwtToken}`;
    }

    axiosInstance.interceptors.request.use(
        function (config) {
            console.log(`${config.method.toUpperCase()} Request made to ${config.url} with data:`, config.data);
            return config
        },
        function (err) {
            console.log(err);
            return err;
        }
    );

    axiosInstance.interceptors.response.use(
        function (response) {
            const { status, data, config } = response;
            console.log(`Response from ${config.url}:`, {
                code: status,
                ...data
            });
            return response;
        },
        async function (error) {
            if (error.response) {
                const { status, data } = error.response;

                switch (status) {
                    case 401:
                        if (data === 'Unauthorized') {
                            try {
                                await refreshToken();
                                const config = error.config;
                                return await axiosInstance({ method: config.method, url: config.url, data: config.data });
                            } catch (e) {
                                //return window.location.href = '/403';
                                break;
                            }
                        } else {
                            //return window.location.href = '/403';
                            break;
                        }
                    default:
                        return Promise.reject(error);
                }
            } else if (error.request) {
                return Promise.reject(error);
            } else {
                return Promise.reject(error);
            }
        }
    )
}

createAxiosResponseInterceptor(axiosInstance)

export default axiosInstance;