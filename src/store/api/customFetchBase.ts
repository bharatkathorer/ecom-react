import {BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError,} from '@reduxjs/toolkit/query';

import {buildQueryString} from '@/utils/common';
import {Mutex} from 'async-mutex';
import {setLogin, setToken, setUser} from './slice/authSlice';
import {RootState} from './../store';

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: ``,
  prepareHeaders: (headers, { getState }) => {
    let token = (getState() as RootState).auth.token;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    headers.set('Accept', 'application/json');
    headers.set('Content-Type', 'application/json');
    return headers;
  },
  paramsSerializer: (params) => {
    return buildQueryString(params);
  },
});

const customFetchBase: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);

  if (
    result.error &&
    result.error.status === 401 &&
    ![
      'auth/login',
      'auth/send-phone-verification-code',
      'auth/send-email-verification-code',
      'auth/register-email',
      'auth/verify-email-code',
      'auth/login-email',
      'login-related-account',
    ].includes((args as FetchArgs).url)
  ) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        api.dispatch(setLogin(false));
        api.dispatch(
          setUser({
            id: '',
            full_name: '',
            email: '',
            phone: '',
            response_date: '',
            is_online: false,
            is_online_profile_state: false,
            custom_id: '',
            is_featured: false,
            email_verified_at: '',
            phone_verified_at: '',
            document_verified_at: '',
            id_verified_at: '',
            verification_status: '',
            is_hide_welcome: '',
            current_title: '',
            current_company: '',
            counts: null,
            joining_date: '',
            gender: '',
            banner_tags: '',
            country: '',
            residency: '',
            time_zone: '',
            last_seen_at: '',
            is_connected: '',
            connection_status: '',
            profile_type: '',
            profile_id: '',
            businessType: '',
            profile: {},
            image: '',
            badges: [],
            context_text: '',
            is_my_account: '',
            v_guide_is_liked: '',
            v_blog_is_liked: '',
            v_jobs_is_liked: '',
            v_lance_is_liked: '',
            v_nation_is_liked: '',
            v_verse_is_liked: '',
            v_guide_is_saved: '',
            v_tube_is_liked: '',
            is_blocked: '',
            is_follower: '',
            is_reported: '',
            is_member: '',
            is_subscriber: '',
            is_candidate: '',
            is_applicant: '',
            is_client: '',
            v_blog_is_saved: '',
            no_of_employees:'',
          })
        );
        api.dispatch(setToken(''));
        window.location.href = '/';
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export default customFetchBase;
