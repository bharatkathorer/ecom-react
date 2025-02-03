import {createApi} from '@reduxjs/toolkit/query/react';
// import customFetchBase from '../customFetchBase';
import {endpoints} from './endpoints';

export const mutationAPI = createApi({
    reducerPath: 'mutationAPI',
    baseQuery: customFetchBase,
    endpoints: (build) => ({
        logout: build.mutation<any, any>({
            query: () => {
                return {
                    url: endpoints.logout,
                    method: 'POST',
                };
            },
        }),

        loginUsingPhone: build.mutation<
            any,
            any
        >({
            query: (body:any) => {
                return {
                    url: endpoints.loginUsingPhone,
                    method: 'POST',
                    body,
                };
            },
        }),

        VNationDeleteGalleryById: build.mutation<any, any>({
            query: (id:any) => {
                return {
                    url: `${endpoints.VNationDeleteGalleryById}/${id}`,
                    method: 'DELETE',
                };
            },
        }),
    })
});
