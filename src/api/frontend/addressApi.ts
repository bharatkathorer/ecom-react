import '../axios.ts';
import axios from 'axios';

const addressApi = {
    index: async () => {
        try {
            return await axios.get('/addresses');
        } catch (error) {
            console.error(error);
            return {};
        }
    },
    store: async (data: any) => {
        try {
            return await axios.post('/addresses', data);
        } catch (error) {
            console.error(error);
            return {};
        }
    },

};
export default addressApi;
