// @ts-ignore
import axios from "axios";
import {BASE_URL} from "../../utils/const.tsx";
import {store} from "../../store/store.tsx";
import {setAdminLoading, setAdmin} from "../../store/slice/adminAuthSlice.ts"; // Import Redux store

axios.defaults.baseURL = `${BASE_URL}/api/backend`;
axios.defaults.headers.post["Accept"] = "application/json";

axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("admin_token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        store.dispatch(setAdminLoading(true)); // Show global loading state
        return config;
    },
    (error) => {
        store.dispatch(setAdminLoading(false)); // Hide loading on request failure
        return Promise.reject(error);
    }
);


//check user login or not
axios.interceptors.response.use((response: any) => {

    if (response?.data?.message === 'Unauthorized user') {
        // window.location.href = '/login';
    }
    if (response?.data?.success && response?.data?.auth) {
        store.dispatch(setAdmin(response?.data?.auth));
        localStorage.setItem('user', response.data.auth);
    }
    store.dispatch(setAdminLoading(false))
    return response;
}, (error: any) => {
    if (error?.response?.status === 401) {
        console.log('ok');
    }
    console.log(error);
    store.dispatch(setAdminLoading(false))
    return error;
});
// @ts-ignore
window.axios = axios;
