import React, { useState, useEffect } from "react";
import styles from "./index.module.scss";

const RealTimeClock: React.FC = () => {
  const [time, setTime] = useState<string>(getCurrentTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getCurrentTime());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

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

  return (
    <div className={styles.container}>
      <h2>{time}</h2>
    </div>
  );
};

export default RealTimeClock;
