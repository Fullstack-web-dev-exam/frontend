import axios from 'axios';

// FIKS CORS I BACKEND

console.log("This is the API ", process.env);
console.log("REACT_APP_BACKEND: ", process.env.REACT_APP_BACKEND)

let axiosInstance = axios;
if(process.env && process.env.NODE_ENV && process.env.NODE_ENV === 'development') {
    axiosInstance = axios.create({
        withCredentials: true,
        baseURL: process.env.REACT_APP_BACKEND
    });
}

export default axiosInstance;