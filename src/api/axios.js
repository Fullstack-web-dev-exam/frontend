import axios from 'axios';

// FIKS CORS I BACKEND

console.log("This is the API ", process.env);

let axiosInstance = axios;
if(process.env && process.env.NODE_ENV && process.env.NODE_ENV === 'production') {
    axiosInstance = axios.create({
        withCredentials: true,
        baseURL: process.env.REACT_APP_BACKEND
    });
} else {
    axiosInstance = axios.create();
}

export default axiosInstance;