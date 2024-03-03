import React, { useState } from "react";
import Calendar from "react-calendar";

// import "react-calendar/dist/Calendar.css";
import "./calendar.css";

const RealTimeCalendar: React.FC = () => {
  const [date, setDate] = useState<any>(new Date());
  return (
    <div className="calendar-container">
      <Calendar onChange={setDate} value={date} />
    </div>
  );
};

export default RealTimeCalendar;
