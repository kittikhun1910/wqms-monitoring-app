import React, { useState, useEffect } from "react";
import styles from "./index.module.scss";

// Functional component for the real-time clock
const RealTimeClock: React.FC = () => {

  // State to hold the current time
  const [time, setTime] = useState<string>(getCurrentTime());

  // Effect to update the time every second 
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getCurrentTime());
    }, 1000);

    // Clean up interval on unmount 
    return () => {
      clearInterval(interval);
    };
  }, []);

  // Function to get the current time in a specific format
  function getCurrentTime(): string {
    const date = new Date();
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const dayOfWeek = daysOfWeek[date.getDay()];
    const month = months[date.getMonth()];
    const dayOfMonth = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    return `${dayOfWeek}, ${month} ${dayOfMonth}, ${hours}:${minutes}:${seconds}`;
  }

   // Render the component with the current time
  return (
    <div className={styles.container}>
      <h2>{time}</h2>
    </div>
  );
};

// Export the RealTimeClock component
export default RealTimeClock;
