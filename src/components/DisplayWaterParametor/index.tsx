import React from "react";
import styles from "./index.module.scss";
import { JSCharting } from "jscharting-react";

// Importing images
import TemperatureUpPNG from "/src/images/temperature-up.png";
import TemperatureDownPNG from "/src/images/temperature-down.png";
import PhBalancePNG from "/src/images/ph-balance.png";

// Defining the structure of the water data
interface WaterData {
  time: string;
  field: string;
  value: string | number;
}

// Defining the props for the DisplayWaterParametor component
interface DisplayWaterParametorProps {
  data: {
    waterData: WaterData[] | null;
    maxMinpHData: WaterData[] | null;
    maxMinTempData: WaterData[] | null;
  };
}

// Functional component to display water parameters
const DisplayWaterParametor: React.FC<DisplayWaterParametorProps> = ({
  data,
}) => {
  // Extracting max/min pH data from props, defaulting to an empty array
  const maxMinpHData = data.maxMinpHData || [];

  // Finding the initial min and max pH values
  const initialMin = maxMinpHData.find((item) => item.value !== null);
  const initialMax = maxMinpHData.find((item) => item.value !== null);

  // Finding the max and min pH values
  const maxPH = maxMinpHData.reduce((prevMax, current) => {
    if (current.value !== null && current.value > prevMax.value) {
      return current;
    } else {
      return prevMax;
    }
  }, initialMax || ({ value: Number.MIN_SAFE_INTEGER } as WaterData));

  const minPH = maxMinpHData.reduce((prevMin, current) => {
    if (current.value !== null && current.value < prevMin.value) {
      return current;
    } else {
      return prevMin;
    }
  }, initialMin || ({ value: Number.MAX_SAFE_INTEGER } as WaterData));

  // Extracting max/min temperature data from props, defaulting to an empty array
  const maxMinTempData = data.maxMinTempData || [];

  // Finding the initial min and max temperature values
  const initialMinTemp = maxMinTempData.find((item) => item.value !== null);
  const initialMaxTemp = maxMinTempData.find((item) => item.value !== null);

  // Finding the max and min temperature values
  const maxTemp = maxMinTempData.reduce((prevMax, current) => {
    if (current.value !== null && current.value > prevMax.value) {
      return current;
    } else {
      return prevMax;
    }
  }, initialMaxTemp || ({ value: Number.MIN_SAFE_INTEGER } as WaterData));
  const minTemp = maxMinTempData.reduce((prevMax, current) => {
    if (current.value !== null && current.value < prevMax.value) {
      return current;
    } else {
      return prevMax;
    }
  }, initialMinTemp || ({ value: Number.MAX_SAFE_INTEGER } as WaterData));

  // Extracting current temperature and pH data from props, defaulting to an empty array
  const tempNowData = data.waterData || [];
  const initialTempNow = tempNowData.find(
    (item) => item.field === "temperature"
  );

  const pHNowData = data.waterData || [];
  const initialpHNow = pHNowData.find((item) => item.field === "avgpH");

  // Configuration for the temperature chart
  const configtemp = {
    // Configuration options
    debug: false,
    legend_visible: false,
    defaultTooltip_enabled: false,
    xAxis_spacingPercentage: 0.4,
    yAxis: [
      {
        id: "ax1",
        defaultTick: {
          padding: 5,
          enabled: false,
        },
        customTicks: [0, 8, 16, 20, 24, 28, 32, 40],
        line: {
          width: 10,
          breaks: {},
          color: "smartPalette:pal1",
        },
      },
    ],
    defaultSeries: {
      type: "gauge column roundcaps",
      shape: {
        label: {
          text: "%max",
          align: "center",
          verticalAlign: "middle",
          style_fontSize: 28,
        },
      },
    },
    series: [
      {
        type: "column roundcaps",
        name: "Temperatures",
        yAxis: "ax1",
        palette: {
          id: "pal1",
          pointValue: "%yValue",
          ranges: [
            { value: [12, 20], color: "#004AAD" },
            { value: [20, 24], color: "#5B96E4" },
            { value: [24, 30], color: "#1AF16A" },
            { value: [31, 32], color: "#F1C81A" },
            { value: [33, 35], color: "#F18E1A" },
          ],
        },
        points: [["x", [0, initialTempNow?.value]]],
      },
    ],
  };

  // Configuration for the pH chart
  const configph = {
    // Configuration options
    debug: false,
    legend_visible: false,
    defaultTooltip_enabled: false,
    xAxis_spacingPercentage: 0.4,
    yAxis: [
      {
        id: "ax1",
        defaultTick: {
          padding: 5,
          enabled: false,
        },
        customTicks: [2, 4, 6, 8, 10, 12, 14],
        line: {
          width: 10,
          breaks: {},
          color: "smartPalette:pal1",
        },
      },
    ],
    defaultSeries: {
      type: "gauge column roundcaps",
      shape: {
        label: {
          text: "%max",
          align: "center",
          verticalAlign: "middle",
          style_fontSize: 28,
        },
      },
    },
    series: [
      {
        type: "column roundcaps",
        name: "pH",
        yAxis: "ax1",
        palette: {
          id: "pal1",
          pointValue: "%yValue",
          ranges: [
            { value: 1, color: "#AD1E23" },
            { value: [2, 3], color: "#ED2024" },
            { value: 4, color: "#F47C20" },
            { value: [5, 6], color: "#FCEA13" },
            { value: [7, 8], color: "#1AE44D" },
            { value: [9, 10], color: "#0BAA4B" },
            { value: [11, 12], color: "#A0DBEA" },
            { value: [13, 14], color: "#634FA1" },
          ],
        },
        points: [["x", [0, initialpHNow?.value]]],
      },
    ],
  };

  // Rendering the component with the temperature and pH charts
  return (
    <div className={styles.container}>
      <div className={styles.tempGuage}>
        <div className={styles.sumBox}>
          {/* Temperature summary */}
          <div className={styles.hightValue}>
            High Temp
            <div className={styles.imgContainer}>
              <img src={TemperatureUpPNG} alt="TemperatureUpPNG" />
              {maxTemp.value.toString() + " °C"}
            </div>
          </div>
          <div className={styles.lowValue}>
            Low Temp
            <div className={styles.imgContainer}>
              <img src={TemperatureDownPNG} alt="TemperatureDownPNG" />
              {minTemp.value.toString() + " °C"}
            </div>
          </div>
          <a href="/Graph">More Details</a>
        </div>

        {/* Temperature chart */}
        <div className={styles.divStyle}>
          Temperatures
          <JSCharting options={configtemp} className={styles.chart} />
        </div>
      </div>
      <div className={styles.phGuage}>
        <div className={styles.sumBox}>

          {/* pH summary */}
          <div className={styles.hightValue}>
            High pH
            <div className={styles.imgContainer}>
              <img src={PhBalancePNG} alt="PhBalancePNG" />
              {maxPH.value.toString()}
            </div>
          </div>
          <div className={styles.lowValue}>
            Low pH
            <div className={styles.imgContainer}>
              <img src={PhBalancePNG} alt="PhBalancePNG" />
              {minPH.value.toString()}
            </div>
          </div>
          <a href="/GraphPH">More Details</a>
        </div>
        
        {/* pH chart */}
        <div className={styles.divStyle}>
          pH
          <JSCharting options={configph} className={styles.chart} />
        </div>
      </div>
    </div>
  );
};

// Exporting the DisplayWaterParametor component
export default DisplayWaterParametor;
