import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { fetchDataAvgpHInfluxDB } from "../../query/useWaterTank";
import { fetchDataMaxMinPhInfluxDB } from "../../query/useMaxMinPh";
import { fetchDataMaxMinTempInfluxDB } from "../../query/useMaxminTemp";
import { fetchDataFromInfluxDB } from "../../query/useRelay";

import { DisplayWaterParametor,DisplayRelayComponent } from "../../components";

const Demo2: React.FC = () => {
  const [data, setData] = useState<{
    waterData: { time: string; field: string; value: string }[] | null;
    maxMinpHData: { time: string; field: string; value: string }[] | null;
    maxMinTempData: { time: string; field: string; value: string }[] | null;
    relayStatus: { time: string; field: string; value: string}[] | null;
  }>({
    waterData: null,
    maxMinpHData: null,
    maxMinTempData: null,
    relayStatus: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const waterData: any = await fetchDataAvgpHInfluxDB();
        const maxMinpHData: any = await fetchDataMaxMinPhInfluxDB();
        const maxMinTempData: any = await fetchDataMaxMinTempInfluxDB();
        const relayStatus: any = await fetchDataFromInfluxDB();

        setData({ waterData, maxMinpHData, maxMinTempData,relayStatus });
      } catch (error) {
        console.error("Error fetching data from InfluxDB:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <DisplayWaterParametor data={data as any} />
      <DisplayRelayComponent data={data as any} />
    </div>
  );
};

export default Demo2;
