import '../axios.ts';
import axios from 'axios';
import {makeFormData} from "../../utils/const.tsx";

const productsApi = {
    index: async (page: any) => {
        try {
            return await axios.get(`/backend/products?page=${page ?? 1}`);
        } catch (error) {
            console.error(error);
            return {};
        }
    },
    find: async (productId: any) => {
        try {
            return await axios.get(`/backend/products/${productId}`);
        } catch (error) {
            console.error(error);
            return {};
        }
    },
    store: async (data: any) => {
        try {
            // Send request with correct headers
            return await axios.post("/backend/products", makeFormData(data), {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
        } catch (error) {
            console.error(error);
            return {};
        }
    },
    update: async (productId: any, data: any) => {
        try {
            // Send request with correct headers
            return await axios.put(`/backend/products/${productId}`, makeFormData(data), {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
        } catch (error) {
            console.error(error);
            return {};
        }
    },
    delete: async (productId: any) => {
        try {
            return await axios.delete(`/backend/products/${productId}`);
        } catch (error) {
            console.error(error);
            return {};
        }
    }
};
export default productsApi;
