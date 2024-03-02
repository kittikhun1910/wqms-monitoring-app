import React, { useState } from "react";
import styles from "./index.module.scss";
import Calendar from "react-calendar";

import './calendar.scss';

const RealTimeCalendar: React.FC = () => {
  const [date, setDate] = useState<any>(new Date());
  return (
    <div className={styles.container}>
      <>
        <h1 className="text-center">React Calendar</h1>
        <div className="calendar-container">
          <Calendar onChange={setDate} value={date} />
        </div>
        <p className="text-center">
          <span className="bold">Selected Date:</span> {date.toDateString()}
        </p>
      </>
    </div>
  );
};

export default RealTimeCalendar;
