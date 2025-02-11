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

const adminAuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAdminLogin: (state, action: PayloadAction<boolean>) => {
            state.login = action.payload;
        },
        setAdmin: (state, action: PayloadAction<any>) => {
            state.user = action.payload;
        },
        setAdminToken: (state, action: PayloadAction<string | null>) => {
            state.token = action.payload;
        },
        setAdminLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        }
    },
});

export const {
    setAdminLogin,
    setAdmin,
    setAdminToken,
    setAdminLoading
} = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
