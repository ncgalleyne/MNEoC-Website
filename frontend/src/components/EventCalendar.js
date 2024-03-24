// src/components/AddEvent.js
import React from 'react';
import Calendar from 'react-calendar'

const EventCalendar = ({events}) => {

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
  
  return (
    <div className="event-calendar-container">
      <Calendar 
        tileClassName={tileClassName}
      />
    </div>
  );
};

export default EventCalendar;
