import React from "react";
import styles from "./index.module.scss";
import { JSCharting } from "jscharting-react";

import TemperatureUpPNG from "/src/images/temperature-up.png";
import TemperatureDownPNG from "/src/images/temperature-down.png";
import PhBalancePNG from "/src/images/ph-balance.png";

interface WaterData {
  time: string;
  field: string;
  value: string | number;
}

interface DisplayWaterParametorProps {
  data: {
    waterData: WaterData[] | null;
    maxMinpHData: WaterData[] | null;
    maxMinTempData: WaterData[] | null;
  };
}

const DisplayWaterParametor: React.FC<DisplayWaterParametorProps> = ({
  data,
}) => {
  const maxMinpHData = data.maxMinpHData || [];
  const initialMin = maxMinpHData.find((item) => item.value !== null);
  const initialMax = maxMinpHData.find((item) => item.value !== null);

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

  const maxMinTempData = data.maxMinTempData || [];
  const initialMinTemp = maxMinTempData.find((item) => item.value !== null);
  const initialMaxTemp = maxMinTempData.find((item) => item.value !== null);
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

  const tempNowData = data.waterData || [];
  const initialTempNow = tempNowData.find(
    (item) => item.field === "temperature"
  );

  const pHNowData = data.waterData || [];
  const initialpHNow = pHNowData.find((item) => item.field === "avgpH");

  const configtemp = {
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

  const configph = {
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
  return (
    <div className={styles.container}>
      <div className={styles.tempGuage}>
        <div className={styles.sumBox}>
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
        <div className={styles.divStyle}>
          Temperatures
          <JSCharting options={configtemp} className={styles.chart} />
        </div>
      </div>
      <div className={styles.phGuage}>
        <div className={styles.sumBox}>
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
        <div className={styles.divStyle}>
          pH
          <JSCharting options={configph} className={styles.chart} />
        </div>
      </div>
    </div>
  );
};

export default DisplayWaterParametor;
