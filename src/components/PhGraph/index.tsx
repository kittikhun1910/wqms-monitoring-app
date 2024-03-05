// TempGraph.tsx
import React, { useState } from "react";
import JSCChart from "jscharting-react";
import styles from "./index.module.scss";

interface pHAllData {
  time: string;
  field: string;
  value: string | number;
}

interface DisplayPHGraphProps {
  data: {
    pHAllData: pHAllData[] | null;
  };
}

const PhGraph: React.FC<DisplayPHGraphProps> = ({ data }) => {
  const pHAllData = data.pHAllData || [];
  console.log(pHAllData, "display");

  const [selectedGraph, setSelectedGraph] = useState<"1h" | "1d" | "7d">("1h");

  const handleGraphChange = (graph: "1h" | "1d" | "7d") => {
    setSelectedGraph(graph);
  };

  const getButtonClassName = (graph: "1h" | "1d" | "7d") => {
    return selectedGraph === graph ? styles.activeButton : styles.button;
  };

  const last30DaysData = pHAllData.filter((item) => {
    const currentDate = new Date(item.time);
    const last30DaysDate = new Date();
    last30DaysDate.setDate(last30DaysDate.getDate() - 30);
    return currentDate > last30DaysDate;
  });

  const last1HourData = last30DaysData.filter((item) => {
    const currentDate = new Date(item.time);
    const last1HourDate = new Date();
    last1HourDate.setHours(last1HourDate.getHours() - 1);
    return currentDate > last1HourDate;
  });

  const chartData1h = last1HourData.map((item) => [item.time, item.value]);

  const last1DayData = last30DaysData.filter((item) => {
    const currentDate = new Date(item.time);
    const last1DayDate = new Date();
    last1DayDate.setDate(last1DayDate.getDate() - 1);
    return currentDate > last1DayDate;
  });

  const chartData1d = last1DayData.map((item) => [item.time, item.value]);

  const last7DaysData = last30DaysData.filter((item) => {
    const currentDate = new Date(item.time);
    const last7DaysDate = new Date();
    last7DaysDate.setDate(last7DaysDate.getDate() - 7);
    return currentDate > last7DaysDate;
  });

  const chartData7d = last7DaysData.map((item) => [item.time, item.value]);

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

  let selectedOptions;
  if (selectedGraph === "1h") {
    selectedOptions = options1h;
  } else if (selectedGraph === "1d") {
    selectedOptions = options1d;
  } else if (selectedGraph === "7d") {
    selectedOptions = options7d;
  }

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
