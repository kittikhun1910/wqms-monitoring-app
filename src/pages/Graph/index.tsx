import React, { useEffect, useState } from "react";
import { fetchAllDataTempInfluxDB } from "../../query/useTempGraph";

import styles from "./index.module.scss";
import { Navbar, TempGraph } from "../../components";

const Graph: React.FC = () => {
  const [data, setData] = useState<{
    tempAllData: { time: string; field: string; value: string }[] | null;
  }>({
    tempAllData: null,
  });

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
    <>
      <Navbar />
      <div className={styles.container}>
      <button
          className={styles.button}
          onClick={() => (window.location.href = "/Dashboard")}
        >
          {" "}
          Back
        </button>
        <div className={styles.content}>
          <TempGraph data={data as any} />
        </div>
        <button
          className={styles.button}
          onClick={() => (window.location.href = "/GraphPH")}
        >
          {" "}
          Next to pH
        </button>
      </div>
    </>
  );
};

export default Graph;
