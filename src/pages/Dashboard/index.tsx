import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { DisplayRelayComponent, MQTTComponent, Navbar } from "../../components";
import { fetchDataFromInfluxDB } from "../../query/useRelay";

const Dashboard: React.FC = () => {
  const [data, setData] = useState<{
    time: string;
    field: string;
    value: string;
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: any = await fetchDataFromInfluxDB();
        setData(data);
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
        <div className={styles.content}>
          <DisplayRelayComponent data={data as any} />
          <MQTTComponent />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
