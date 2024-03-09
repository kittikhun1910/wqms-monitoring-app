// Import React and useState hook from 'react' package
import React, { useState } from "react";

// Import JSCChart component from 'jscharting-react' package
import JSCChart from "jscharting-react";

// Import styles from index.module.scss file
import styles from "./index.module.scss";

// Define the interface for temperature data
interface TempAllData {
  time: string;
  field: string;
  value: string | number;
}

// Define the props interface for the TempGraph component
interface DisplayTempGraphProps {
  data: {
    tempAllData: TempAllData[] | null;
  };
}

// Define the TempGraph functional component
const TempGraph: React.FC<DisplayTempGraphProps> = ({ data }) => {

  // Destructure the tempAllData from props or set it to an empty array if null
  const tempAllData = data.tempAllData || [];

  // State to manage the selected graph period (1h, 1d, 7d)
  const [selectedGraph, setSelectedGraph] = useState<"1h" | "1d" | "7d">("1h");

  // Function to handle the graph period change
  const handleGraphChange = (graph: "1h" | "1d" | "7d") => {
    setSelectedGraph(graph);
  };

  // Function to get the button className based on the selected graph perio
  const getButtonClassName = (graph: "1h" | "1d" | "7d") => {
    return selectedGraph === graph ? styles.activeButton : styles.button;
  };

  // Filter the data for the last 30 days
  const last30DaysData = tempAllData.filter((item) => {
    const currentDate = new Date(item.time);
    const last30DaysDate = new Date();
    last30DaysDate.setDate(last30DaysDate.getDate() - 30);
    return currentDate > last30DaysDate;
  });

  // Filter the data for the last 1 hour
  const last1HourData = last30DaysData.filter((item) => {
    const currentDate = new Date(item.time);
    const last1HourDate = new Date();
    last1HourDate.setHours(last1HourDate.getHours() - 1);
    return currentDate > last1HourDate;
  });

  // Map the data for the last 1 hour to chart data format
  const chartData1h = last1HourData.map((item) => [item.time, item.value]);

  // Filter the data for the last 1 day
  const last1DayData = last30DaysData.filter((item) => {
    const currentDate = new Date(item.time);
    const last1DayDate = new Date();
    last1DayDate.setDate(last1DayDate.getDate() - 1);
    return currentDate > last1DayDate;
  });

  // Map the data for the last 1 day to chart data format
  const chartData1d = last1DayData.map((item) => [item.time, item.value]);

  // Filter the data for the last 7 days
  const last7DaysData = last30DaysData.filter((item) => {
    const currentDate = new Date(item.time);
    const last7DaysDate = new Date();
    last7DaysDate.setDate(last7DaysDate.getDate() - 7);
    return currentDate > last7DaysDate;
  });

  // Map the data for the last 7 days to chart data format
  const chartData7d = last7DaysData.map((item) => [item.time, item.value]);

  // Define options for different graph Options for 1 Hour
  const options1h = {
    debug: false,
    type: "line",
    title_label_text: "Area Series Types (1 Hour)",
    legend_visible: false,
    defaultSeries: {
      shape_opacity: 5,
      color: "#77E6AB",
      defaultPoint_marker_visible: false, // Hide point markers
      line_width: 3, // Set line width
    },
    xAxis: {
      scale_type: "time",
    },
    yAxis: {
      defaultTick_max: 40,
      defaultTick_min: 0,
    },
    series: [{ name: "Purchases", points: chartData1h }],
  };

  // Define options for different graph Options for 1 Day
  const options1d = {
    debug: false,
    type: "line",
    title_label_text: "Area Series Types (1 Day)",
    legend_visible: false,
    defaultSeries: {
      shape_opacity: 5,
      color: "#77E6AB",
      defaultPoint_marker_visible: false, // Hide point markers
      line_width: 3, // Set line width
    },
    xAxis: {
      scale_type: "time",
    },
    yAxis: {
      defaultTick_max: 40,
      defaultTick_min: 0,
    },
    series: [{ name: "Purchases", points: chartData1d }],
  };

  // Define options for different graph Options for 7 Days
  const options7d = {
    debug: false,
    type: "line",
    title_label_text: "Area Series Types (7 Days)",
    legend_visible: false,
    defaultSeries: {
      shape_opacity: 5,
      color: "#77E6AB",
      defaultPoint_marker_visible: false, // Hide point markers
      line_width: 3, // Set line width
    },
    xAxis: {
      scale_type: "time",
    },
    yAxis: {
      defaultTick_max: 40,
      defaultTick_min: 0,
    },
    series: [{ name: "Purchases", points: chartData7d }],
  };

  // Determine which options to use based on the selected graph period
  let selectedOptions;
  if (selectedGraph === "1h") {
    selectedOptions = options1h;
  } else if (selectedGraph === "1d") {
    selectedOptions = options1d;
  } else if (selectedGraph === "7d") {
    selectedOptions = options7d;
  }


  // Render the component with the selected graph
  return (
    <div className={styles.container}>
      <div className={styles.headerBox}>
        <h2>Temperature</h2>
        <div className={styles.buttonSelectdata}>
          <button
            className={getButtonClassName("1h")}
            onClick={() => handleGraphChange("1h")}
          >
            1 Hour
          </button>
          <button
            className={getButtonClassName("1d")}
            onClick={() => handleGraphChange("1d")}
          >
            1 Day
          </button>
          <button
            className={getButtonClassName("7d")}
            onClick={() => handleGraphChange("7d")}
          >
            7 Days
          </button>
        </div>
      </div>
      <div className={styles.graphBox}>
        <JSCChart options={selectedOptions} />
      </div>
    </div>
  );
};

// Export the TempGraph component
export default TempGraph;
