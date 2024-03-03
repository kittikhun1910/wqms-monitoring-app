import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { fetchDataAvgpHInfluxDB } from "../../query/useWaterTank";
import { fetchDataMaxMinPhInfluxDB } from "../../query/useMaxMinPh";
import { fetchDataMaxMinTempInfluxDB } from "../../query/useMaxminTemp";
import { fetchDataFromInfluxDB } from "../../query/useRelay";

import {
  DisplayWaterParametor,
  DisplayRelayComponent,
  Navbar,
  RealTimeCock,
  RealTimeCalendar,
  DisplayWaterLevel,
} from "../../components";

const Dashboard: React.FC = () => {
  const [data, setData] = useState<{
    waterData: { time: string; field: string; value: string }[] | null;
    maxMinpHData: { time: string; field: string; value: string }[] | null;
    maxMinTempData: { time: string; field: string; value: string }[] | null;
    relayStatus: { time: string; field: string; value: string }[] | null;
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

        setData({ waterData, maxMinpHData, maxMinTempData, relayStatus });
      } catch (error) {
        console.error("Error fetching data from InfluxDB:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.contentBox}>
        <DisplayWaterParametor data={data as any} />
        <div className={styles.subContentBox}>
          <RealTimeCock />
          <RealTimeCalendar />
        </div>
      </div>
      <div className={styles.bottomBox} >
        <DisplayRelayComponent data={data as any} />
        <DisplayWaterLevel data={data as any} />
      </div>
    </div>
  );
};

export default Dashboard;
