import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { fetchDataAvgpHInfluxDB } from "../../query/useWaterTank";
import { fetchDataMaxMinPhInfluxDB } from "../../query/useMaxMinPh";
import { fetchDataMaxMinTempInfluxDB } from "../../query/useMaxminTemp";

import { DisplayWaterParametor } from "../../components";

const Demo2: React.FC = () => {
  const [data, setData] = useState<{
    waterData: { time: string; field: string; value: string }[] | null;
    maxMinpHData: { time: string; field: string; value: string }[] | null;
    maxMinTempData: { time: string; field: string; value: string }[] | null;
  }>({
    waterData: null,
    maxMinpHData: null,
    maxMinTempData: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const waterData: any = await fetchDataAvgpHInfluxDB();
        const maxMinpHData: any = await fetchDataMaxMinPhInfluxDB();
        const maxMinTempData: any = await fetchDataMaxMinTempInfluxDB();

        setData({ waterData, maxMinpHData, maxMinTempData });
      } catch (error) {
        console.error("Error fetching data from InfluxDB:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <DisplayWaterParametor data={data as any} />
    </div>
  );
};

export default Demo2;
