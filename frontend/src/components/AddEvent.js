// src/components/AddEvent.js
import React, { useState } from 'react';
import axios from 'axios';

const AddEvent = () => {
  const [event, setEvent] = useState({ title: '', description: '', date: '' });

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/events', event);
      alert('Event added successfully!');
      // Reset form or redirect as needed
    } catch (error) {
      console.error('There was an error posting the event:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input type="text" name="title" onChange={handleChange} />
      </label>
      <label>
        Description:
        <textarea name="description" onChange={handleChange} />
      </label>
      <label>
        Date:
        <input type="date" name="date" onChange={handleChange} />
      </label>
      <button type="submit">Add Event</button>
    </form>
  );
};

export default AddEvent;
