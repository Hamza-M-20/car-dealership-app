import axios from 'axios';
const BASE_URL = 'http://localhost:8000/api/cars/';

const getCars = async () => {
    try {
        const response = await axios.get(BASE_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching cars:', error);
        throw error;
    }
};

const getCar = async (id) => {
    try {
        const res  = await axios.get(`${BASE_URL}${id}/`);
        return res.data;
    } catch (error) {
        console.error('Error fetching car:', error);
        throw error;
    }
};
const createCar = async (carData) => {
    try {
        const token = localStorage.getItem('token');
        const res = await axios.post(BASE_URL, carData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data;
    } catch (error) {
        console.error('Error creating car:', error);
        throw error;
    }
};

const updateCar = async (id, carData) => {
    try {
        const token = localStorage.getItem('token');
        const res = await axios.put(`${BASE_URL}${id}/`, carData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data;
    } catch (error) {
        console.error('Error updating car:', error);
        throw error;
    }
};

const deleteCar = async (id) => {
    try {
        const token = localStorage.getItem('token');
        await axios.delete(`${BASE_URL}${id}/`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    } catch (error) {
        console.error('Error deleting car:', error);
        throw error;
    }
};
const addReview = async (id, reviewData) => {
    try {
        const token = localStorage.getItem('token');
        const res = await axios.post('http://localhost:8000/api/reviews/', {
            ...reviewData,
            car: id
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data;
    } catch (error) {
        console.error('Error adding review:', error);
        throw error;
    }
};
const getReviews = async (id) => {
    try {
        const res = await axios.get(`http://localhost:8000/api/reviews/?car=${id}`);
        return res.data;
    } catch (error) {
        console.error('Error getting reviews:', error);
        throw error;
    }
};

export default {
    getCars,
    getCar,
    createCar,
    updateCar,
    deleteCar,
    addReview,
    getReviews
};