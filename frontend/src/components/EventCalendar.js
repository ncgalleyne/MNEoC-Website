// src/components/AddEvent.js
import React from 'react';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import './EventCalendar.css'

const EventCalendar = ({events, setSelectedCalendarEvent}) => {

  // Function to generate class names for highlighted dates
  const tileClassName = ({ date }) => {
    const highlightedDates = events.map(event => new Date(event.date))
    // Check if the current date is included in the list of highlighted dates
    const isHighlighted = highlightedDates.some(highlightedDate =>
      new Date(highlightedDate).toDateString() === date.toDateString()
    );

    // Return the class name based on whether the current date is highlighted
    return isHighlighted ? 'highlighted-date' : null;
  };

  // Function to handle click on a day
  const handleClickDay = (date) => {
    // Find the event for the clicked date
    const eventForDate = events.find(event =>
      new Date(event.date).toDateString() === date.toDateString()
    );

    // If an event exists for the clicked date, set the selectedEvent prop
    if (eventForDate) {
      setSelectedCalendarEvent(eventForDate);
    }
  };
  
  return (
    <div className="event-calendar-container">
      <Calendar 
        tileClassName={tileClassName}
        onClickDay={handleClickDay}
      />
    </div>
  );
};

export default EventCalendar;
