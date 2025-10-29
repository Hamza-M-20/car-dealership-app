import axios from 'axios';
const BASE_URL = 'http://localhost:8000/api/dealerships/';

const getDealerships = async () => {
    try {
        const res = await axios.get(BASE_URL);
        const data = await res.data;
        return data;
    } catch (error) {
        console.error('Error fetching dealerships:', error);
        throw error;
    }
};

const getDealership = async (id) => {
    try {
        const res = await axios.get(`${BASE_URL}${id}/`);
        const data = await res.data;
        return data;
    } catch (error) {
        console.error('Error fetching dealership:', error);
        throw error;
    }
};

export default {
    getDealerships,
    getDealership,
  
};

