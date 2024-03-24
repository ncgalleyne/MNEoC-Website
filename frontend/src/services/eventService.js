import ApiHandler from '../util/ApiHandler';

const addEvent = async (eventData) => {
    try {
        const response = await ApiHandler.post('/events', eventData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default addEvent
