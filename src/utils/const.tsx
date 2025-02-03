import {setLogin, setToken, setUser} from "../store/slice/authSlice.ts";

export const BASE_URL: string = 'http://localhost:8000';

export const makeUrl = (url: string): string => {
    return `${BASE_URL}/${url}`;
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
