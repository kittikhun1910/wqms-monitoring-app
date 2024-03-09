import React, { useEffect, useState } from "react";
import { fetchAllDataPHInfluxDB } from "../../query/usePhGraph";

import styles from "./index.module.scss";
import { Navbar, PhGraph } from "../../components";
import Verify from "../components/Verify";

const GraphPH: React.FC = () => {
  // State to hold the fetched pH data
  const [data, setData] = useState<{
    pHAllData: { time: string; field: string; value: string }[] | null;
  }>({
    pHAllData: null,
  });

  // Fetch pH data from InfluxDB when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const pHAllData: any = await fetchAllDataPHInfluxDB();
        setData({ pHAllData });
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
        <Navbar />
        <div className={styles.container}>
          {/* Back button to navigate back to the temperature graph */}
          <button
            className={styles.button}
            onClick={() => (window.location.href = "/graph")}
          >
            Back to Temp
          </button>
          <div className={styles.content}>
            {/* Display the pH graph */}
            <PhGraph data={data as any} />

          </div>
          {/* Button to navigate back to the dashboard */}
          <button
            className={styles.button}
            onClick={() => (window.location.href = "/dashboard")}
          >
            Dashboard
          </button>
        </div>
      </>
    </Verify>
  );
};

export default GraphPH;
