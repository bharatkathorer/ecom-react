// @ts-ignore
import axios from "axios";
import {BASE_URL} from "../utils/const.tsx";
import {store} from "../store/store.tsx";
import {setLoading, setUser} from "../store/slice/authSlice.ts"; // Import Redux store

axios.defaults.baseURL = `${BASE_URL}/api`;
axios.defaults.headers.post["Accept"] = "application/json";

axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        store.dispatch(setLoading(true)); // Show global loading state
        return config;
    },
    (error) => {
        store.dispatch(setLoading(false)); // Hide loading on request failure
        return Promise.reject(error);
    }
);


//check user login or not
axios.interceptors.response.use((response: any) => {

    if (response?.data?.message === 'Unauthorized user') {
        window.location.href = '/login';
    }
    if (response?.data?.success && response?.data?.auth) {
        store.dispatch(setUser(response?.data?.auth));
        localStorage.setItem('user', response.data.auth);
    }
    store.dispatch(setLoading(false))
    return response;
}, (error: any) => {
    if (error?.response?.status === 401) {
        console.log('ok');
    }
    console.log(error);
    store.dispatch(setLoading(false))
    return error;
});
// @ts-ignore
window.axios = axios;
