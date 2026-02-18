import axios from 'axios';

const API_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api') + '/items/';

const createItem = async (itemData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            
            'Content-Type': itemData instanceof FormData ? 'multipart/form-data' : 'application/json',
        },
    };

    const response = await axios.post(API_URL, itemData, config);
    return response.data;
};

const getItems = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(API_URL, config);
    return response.data;
};

const deleteItem = async (itemId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.delete(API_URL + itemId, config);
    return response.data;
};

const itemService = {
    createItem,
    getItems,
    deleteItem,
};

export default itemService;
