import axios from 'axios';

const API_URL = 'http://localhost:5000/api/events';

const addEvent = async (eventData) => {
    try {
        const response = await axios.post(API_URL, eventData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default addEvent
