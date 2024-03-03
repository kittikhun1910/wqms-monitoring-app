import React, { useEffect, useState } from "react";
import { fetchAllDataPHInfluxDB } from "../../query/usePhGraph";

import styles from "./index.module.scss";
import { Navbar, PhGraph } from "../../components";

const GraphPH: React.FC = () => {
  const [data, setData] = useState<{
    pHAllData: { time: string; field: string; value: string }[] | null;
  }>({
    pHAllData: null,
  });

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
  console.log(data.pHAllData);

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <button
          className={styles.button}
          onClick={() => (window.location.href = "/Graph")}
        >
          {" "}
          Back to Temp
        </button>
        <div className={styles.content}>
          <PhGraph data={data as any} />
        </div>
        <button
          className={styles.button}
          onClick={() => (window.location.href = "/Dashboard")}
        >
          {" "}
          Dashboard
        </button>
      </div>
    </>
  );
};

export default GraphPH;
