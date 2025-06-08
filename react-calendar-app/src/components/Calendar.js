import React, { useState } from 'react';
import './Calendar.css'; // Add this line

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay(); // 0 for Sunday, 1 for Monday, etc.

  const monthYearString = currentDate.toLocaleDateString('default', { month: 'long', year: 'numeric' });

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Create an array for the days of the month
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  // Create an array for blank cells before the first day
  const blankCellsArray = Array.from({ length: firstDayOfMonth }, (_, i) => null);

  const allCells = [...blankCellsArray, ...daysArray];


  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={goToPreviousMonth}>Previous</button>
        <h2>{monthYearString}</h2>
        <button onClick={goToNextMonth}>Next</button>
      </div>
      <div className="calendar-grid">
        {dayNames.map(day => <div key={day} className="calendar-day-name">{day}</div>)}
        {allCells.map((day, index) => (
          <div key={index} className="calendar-day">
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
