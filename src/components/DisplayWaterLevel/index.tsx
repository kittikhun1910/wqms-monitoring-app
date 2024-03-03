import React from "react";

import styles from "./index.module.scss";
import WaterTankPNG from "/src/images/water-tank.png";
import WaterTankWarningPNG from "/src/images/water-tank-warning.png";

interface WaterData {
  time: string;
  field: string;
  value: string | number;
}

interface DisplayWaterLevelProps {
  data: {
    waterData: WaterData[] | null;
  };
}

const DisplayWaterLevel: React.FC<DisplayWaterLevelProps> = ({ data }) => {
  const relayData = data.waterData || [];
  const water_level_data = relayData.find(
    (item) => item.field === "water_level"
  );
  
  let imageSrc = WaterTankPNG;
  let waterLevelText = "FULL";

  if (water_level_data && (water_level_data.value as number) > 100) {
    imageSrc = WaterTankWarningPNG;
    waterLevelText = "LOWER";
  }

  return (
    <div className={styles.container}>
      <h4>Water Level Tank2</h4>
      <div className={styles.imgBox}>
        <img src={imageSrc} alt="" />
      </div>
      <h4>{waterLevelText}</h4>
    </div>
  );
};

export default DisplayWaterLevel;
