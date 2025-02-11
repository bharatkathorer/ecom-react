import '../axios.ts';
import axios from 'axios';

const orderApi = {
    index: async (page: any) => {
        try {
            return await axios.get(`/backend/orders?page=${page ?? 1}`);
        } catch (error) {
            console.error(error);
            return {};
        }
    },
    find: async (orderId: any) => {
        try {
            return await axios.get(`/backend/orders/${orderId}`);
        } catch (error) {
            console.error(error);
            return {};
        }
    },
    update: async (data: any) => {
        try {
            return await axios.post(`/backend/orders`,data);
        } catch (error) {
            console.error(error);
            return {};
        }
    },
};
export default orderApi;
