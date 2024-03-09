import React, { useEffect, useState } from "react";
import { fetchAllDataTempInfluxDB } from "../../query/useTempGraph";
import styles from "./index.module.scss";
import { Navbar, TempGraph } from "../../components";
import Verify from "../components/Verify";

export const Graph: React.FC = () => {
  // State to hold the fetched temperature data
  const [data, setData] = useState<{
    tempAllData: { time: string; field: string; value: string }[] | null;
  }>({
    tempAllData: null,
  });

  // Fetch temperature data from InfluxDB when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const tempAllData: any = await fetchAllDataTempInfluxDB();
        setData({ tempAllData });
      } catch (error) {
        console.error("Error fetching data from InfluxDB:", error);
      }
    };

    fetchData();
  }, []);

  return (
    // Use the Verify component to ensure user authentication
    <Verify>
      <>
        {/* Display the navigation bar */}
        <Navbar />
        <div className={styles.container}>
          <button
            className={styles.button}
            onClick={() => (window.location.href = "/dashboard")}
          >
            {" "}
            Back
          </button>
          <div className={styles.content}>
            {/* Display the temperature graph */}
            <TempGraph data={data as any} />
            
          </div>
          {/* Button to navigate to the pH graph */}
          <button
            className={styles.button}
            onClick={() => (window.location.href = "/graphPH")}
          >
            {" "}
            Next to pH
          </button>
        </div>
      </>
    </Verify>
  );
};
export default Graph;
