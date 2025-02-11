import './../axios';
import axios from 'axios';

const AuthApi = {
    login: async (data: any) => {
        try {
            return await axios.post('backend/login', data);
        } catch (error) {
            console.error(error);
            return {};
        }
    },
    register: async (data: any) => {
        try {
            return await axios.post('backend/register', data);
        } catch (error) {
            console.error(error);
            return {};
        }
    },
    logout: async () => {
        try {
            return await axios.post('backend/logout');
        } catch (error) {
            console.error(error);
            return {};
        }
    }
};
export default AuthApi;
