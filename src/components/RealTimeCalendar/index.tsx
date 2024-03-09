import React, { useState } from "react";
import Calendar from "react-calendar";

// Importing the custom CSS file for styling the calendar
import "./calendar.css";

// Functional component for the real-time calendar
const RealTimeCalendar: React.FC = () => {

  // State to track the selected date
  const [date, setDate] = useState<any>(new Date());

  // Render the calendar component with the current date state
  return (
    <div className="calendar-container">
      <Calendar onChange={setDate} value={date} />
    </div>
  );
};

// Exporting the RealTimeCalendar component
export default RealTimeCalendar;
