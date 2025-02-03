import {createApi} from '@reduxjs/toolkit/query/react';
import customFetchBase from '../customFetchBase';
import {endpoints} from './endpoints';

export const queryAPI = createApi({
    reducerPath: 'queryAPI',
    baseQuery: customFetchBase,
    tagTypes: [
        'Profile',
    ],
    endpoints: (build) => ({
        //**********V_SEARCH***********//
        getVVSearchPostsByTypeByUser: build.query<any, any>({
            query: ({...params}: any) => {
                return {
                    url: endpoints.getVVSearchPostsByTypeByUser,
                    method: 'GET',
                    params: params,
                };
            },
        }),
    })
});
export const {
    useGetVVSearchPostsByTypeByUserQuery
} = queryAPI;
