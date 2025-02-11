import '../axios.ts';
import axios from 'axios';

const AuthApi = {
    login: async (data: any) => {
        try {
            return await axios.post('/user/login', data);
        } catch (error) {
            console.error(error);
            return {};
        }
    },
    register: async (data: any) => {
        try {
            return await axios.post('/user/register', data);
        } catch (error) {
            console.error(error);
            return {};
        }
    },
    logout: async () => {
        try {
            return await axios.post('/user/logout');
        } catch (error) {
            console.error(error);
            return {};
        }
    }
};
export default AuthApi;
