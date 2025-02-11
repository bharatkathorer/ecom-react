import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {persistReducer, persistStore} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// import {mutationAPI} from './api/mutations'
// import {queryAPI} from './api/queries'
import authSlice from './slice/authSlice.ts'
import adminAuthSlice from "./slice/adminAuthSlice.ts";

const appReducer = combineReducers({
    // [queryAPI.reducerPath]: queryAPI.reducer,
    // [mutationAPI.reducerPath]: mutationAPI.reducer,
    auth: authSlice,
    adminAuth: adminAuthSlice,
})

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, appReducer)

export const store = configureStore({
    reducer: persistedReducer,
    // middleware: (getDefaultMiddleware) =>
    //     getDefaultMiddleware({serializableCheck: false}).concat([queryAPI.middleware, mutationAPI.middleware]),
})

export const persist = persistStore(store)

export type AppDispatch = typeof store.dispatch
export type ReduxPersist = ReturnType<typeof persistStore>
export type RootState = ReturnType<typeof store.getState>

export default store
