import React, { useState } from 'react';
import eventService from './services/eventService';
// import axios from 'axios';

function App() {
    const [event, setEvent] = useState({
        title: '',
        description: '',
        date: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEvent(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await eventService.addEvent(event)
            alert('Event added successfully');
            setEvent({
                title: '',
                description: '',
                date: ''
            });
        } catch (error) {
            console.error('Failed to add event:', error);
            alert('Failed to add event');
        }
    };

    return (
        <div className="App">
            <h1>Add Event</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" placeholder="Title" value={event.title} onChange={handleChange} />
                <br />
                <textarea name="description" placeholder="Description" value={event.description} onChange={handleChange}></textarea>
                <br />
                <input type="date" name="date" value={event.date} onChange={handleChange} />
                <br />
                <button type="submit">Add Event</button>
            </form>
        </div>
    );
}

export default App;
