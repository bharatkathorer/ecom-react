import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState: {
    login: boolean
    loading: boolean
    user: any,
    token: string | null,
} = {
    login: false,
    loading: false,
    user: {},
    token: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLogin: (state, action: PayloadAction<boolean>) => {
            state.login = action.payload;
        },
        setUser: (state, action: PayloadAction<any>) => {
            state.user = action.payload;
        },
        setToken: (state, action: PayloadAction<string | null>) => {
            state.token = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        }
    },
});

export const {
    setLogin,
    setUser,
    setToken,
    setLoading
} = authSlice.actions;
export default authSlice.reducer;
