import React from "react";

// Importing the CSS module for styling
import styles from "./index.module.scss";

// Importing images
import WaterTankPNG from "/src/images/water-tank.png";
import WaterTankWarningPNG from "/src/images/water-tank-warning.png";

// Defining the structure of the water data
interface WaterData {
  time: string;
  field: string;
  value: string | number;
}

// Defining the props for the DisplayWaterLevel component
interface DisplayWaterLevelProps {
  data: {
    waterData: WaterData[] | null;
  };
}

// Functional component to display water level
const DisplayWaterLevel: React.FC<DisplayWaterLevelProps> = ({ data }) => {

  // Extracting water data from props, defaulting to an empty array
  const relayData = data.waterData || [];

  // Finding the water level data from the relayData array
  const water_level_data = relayData.find(
    (item) => item.field === "water_level"
  );
  
  // Setting default image source and water level tex
  let imageSrc = WaterTankPNG;
  let waterLevelText = "FULL";

  // Checking if water level exceeds 100, then updating image source and text
  if (water_level_data && (water_level_data.value as number) > 100) {
    imageSrc = WaterTankWarningPNG;
    waterLevelText = "LOWER";
  }

  // Rendering the component with the updated image source and text
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

// Exporting the DisplayWaterLevel component
export default DisplayWaterLevel;
