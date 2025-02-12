import {setLogin, setToken, setUser} from "../store/slice/authSlice.ts";
import {setAdmin, setAdminLogin, setAdminToken} from "../store/slice/adminAuthSlice.ts";

export const BASE_URL: string = 'http://localhost:8000';

export const makeUrl = (url: string): string => {
    if (url) {
        return `${BASE_URL}/${url}`;
    } else {
        return url;
    }
}

export const handleLoginUser = (data: any, dispatch: any) => {

    localStorage.setItem('user', data);
    localStorage.setItem('token', data.token);
    dispatch(setLogin(true));
    dispatch(setUser(data));
    dispatch(setToken(data.token));
}

export const handleLogoutUser = (dispatch: any) => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    dispatch(setLogin(false));
    dispatch(setUser({}));
    dispatch(setToken(null));
}

export const handleLoginAdmin = (data: any, dispatch: any) => {
    localStorage.setItem('admin_user', data);
    localStorage.setItem('admin_token', data.token);
    dispatch(setAdminLogin(true));
    dispatch(setAdmin(data));
    dispatch(setAdminToken(data.token));
}

export const handleLogoutAdmin = (dispatch: any) => {
    localStorage.removeItem('admin_user');
    localStorage.removeItem('admin_token');
    dispatch(setAdminLogin(false));
    dispatch(setAdmin({}));
    dispatch(setAdminToken(null));
}

export const makeFormData = (data: any) => {
    const formData = new FormData();
    // Append all fields to FormData
    for (const key in data) {
        formData.append(key, data[key]); // Handles both file & other data
    }
    return formData;
}

export function formatDate(date: Date) {
    const _date = new Date(date);
    let options: any = {hour: 'numeric', minute: 'numeric', hour12: true};
    // let options = { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true }
    let timeString = _date.toLocaleTimeString('en-US', options);

    return `${AddZero(_date.getDate())}-${AddZero(_date.getMonth() + 1)}-${_date.getFullYear()} ${timeString}`;
}

export function AddZero(value: string | number) {
    return value.toString().padStart(2, '0');
}

export const orderStatusList: any = {
    0: "Pending",
    1: "Approve",
    2: "Rejected",
    3: "Canceled",
    4: "Dispatch",
    5: "Out for Delivery",
    6: "Delivered",
    7: "Return",
    8: "Refund",
    9: "Reject Return",
    10: "Reject Refund",
    11: "Return Approve",
    12: "Refund Approve",
}
export const orderStatus = (status: any) => {
    return orderStatusList?.[status] ?? 'Invalid Status';
}
