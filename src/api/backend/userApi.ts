import '../axios.ts';
import axios from 'axios';

const userApi = {
    index: async (page: any) => {
        try {
            return await axios.get(`/backend/users?page=${page ?? 1}`);
        } catch (error) {
            console.error(error);
            return {};
        }
    },
};
export default userApi;
