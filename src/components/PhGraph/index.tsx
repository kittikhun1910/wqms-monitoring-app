// TempGraph.tsx
import React, { useState } from "react";
import JSCChart from "jscharting-react";
import styles from "./index.module.scss";

// Interface for pH data
interface pHAllData {
  time: string;
  field: string;
  value: string | number;
}

// Props for DisplayPHGraph component
interface DisplayPHGraphProps {
  data: {
    pHAllData: pHAllData[] | null;
  };
}

// Functional component to display pH graph
const PhGraph: React.FC<DisplayPHGraphProps> = ({ data }) => {
  const pHAllData = data.pHAllData || [];
  console.log(pHAllData, "display");

  // State to track selected graph period
  const [selectedGraph, setSelectedGraph] = useState<"1h" | "1d" | "7d">("1h");

  // Function to handle graph change
  const handleGraphChange = (graph: "1h" | "1d" | "7d") => {
    setSelectedGraph(graph);
  };

  // Function to get button className based on selected graph period
  const getButtonClassName = (graph: "1h" | "1d" | "7d") => {
    return selectedGraph === graph ? styles.activeButton : styles.button;
  };

  // Filter data for last 30 days
  const last30DaysData = pHAllData.filter((item) => {
    const currentDate = new Date(item.time);
    const last30DaysDate = new Date();
    last30DaysDate.setDate(last30DaysDate.getDate() - 30);
    return currentDate > last30DaysDate;
  });

  // Filter data for last 1 hour
  const last1HourData = last30DaysData.filter((item) => {
    const currentDate = new Date(item.time);
    const last1HourDate = new Date();
    last1HourDate.setHours(last1HourDate.getHours() - 1);
    return currentDate > last1HourDate;
  });

  // Map data for chart
  const chartData1h = last1HourData.map((item) => [item.time, item.value]);

  // Filter data for last 1 Day
  const last1DayData = last30DaysData.filter((item) => {
    const currentDate = new Date(item.time);
    const last1DayDate = new Date();
    last1DayDate.setDate(last1DayDate.getDate() - 1);
    return currentDate > last1DayDate;
  });

  // Map data for chart
  const chartData1d = last1DayData.map((item) => [item.time, item.value]);

  // Filter data for last 7 Day
  const last7DaysData = last30DaysData.filter((item) => {
    const currentDate = new Date(item.time);
    const last7DaysDate = new Date();
    last7DaysDate.setDate(last7DaysDate.getDate() - 7);
    return currentDate > last7DaysDate;
  });

  // Map data for chart
  const chartData7d = last7DaysData.map((item) => [item.time, item.value]);

  // Options for 1-hour chart
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
      defaultTick_max: 14,
      defaultTick_min: 0,
    },
    series: [{ name: "Purchases", points: chartData1h }],
  };

  // Options for 1-day chart
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
      defaultTick_max: 14,
      defaultTick_min: 0,
    },
    series: [{ name: "Purchases", points: chartData1d }],
  };

  // Options for 7-day chart
  const options7d = {
    debug: false,
    type: "line",
    title_label_text: "Area Series Types (7 Days)",
    legend_visible: false,
    defaultSeries: {
      shape_opacity: 5,
      color: "#77E6AB",
      defaultPoint_marker_visible: false, // Hide point markers
      line_width: 2, // Set line width
    },
    xAxis: {
      scale_type: "time",
    },
    yAxis: {
      defaultTick_max: 14,
      defaultTick_min: 0,
    },
    series: [{ name: "Purchases", points: chartData7d }],
  };

  // Determine selected options based on selectedGraph state
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
        <h2>PH</h2>
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

export default PhGraph;
