import './axios';
import axios from 'axios';

const productsApi = {
    index: async () => {
        try {
            return await axios.get('/products');
        } catch (error) {
            console.error(error);
            return {};
        }
    },

    addCart: async (product_id: any) => {
        try {
            return await axios.post('/carts', {product_id});
        } catch (error) {
            console.error(error);
            return {};
        }
    },

    cartList: async () => {
        try {
            return await axios.get('/carts');
        } catch (error) {
            console.error(error);
            return {};
        }
    },

    checkout: async (data:any) => {
        try {
            return await axios.post('/orders/checkout',data);
        } catch (error) {
            console.error(error);
            return {};
        }
    },


    orders: async () => {
        try {
            return await axios.get('/orders');
        } catch (error) {
            console.error(error);
            return {};
        }
    },



};
export default productsApi;
