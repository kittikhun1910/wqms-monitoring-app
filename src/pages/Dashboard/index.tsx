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
import Verify from "../components/Verify";

const Dashboard: React.FC = () => {

  // State to hold the fetched data
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

  // Fetch data from InfluxDB when the component mounts
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

    // Use the Verify component to ensure user authentication
    <Verify>
      <div className={styles.container}>
        {/* Display the navigation bar */}
        <Navbar />

        <div className={styles.contentBox}>
          {/* Display water parameter data */}
          <DisplayWaterParametor data={data as any} />
          <div className={styles.subContentBox}>
            {/* Display real-time clock and calendar */}
            <RealTimeCock />
            <RealTimeCalendar />

          </div>
        </div>
        <div className={styles.bottomBox}>
          {/* Display relay status and water level */}
          <DisplayRelayComponent data={data as any} />
          <DisplayWaterLevel data={data as any} />
          
        </div>
      </div>
    </Verify>
  );
};

export default Dashboard;
