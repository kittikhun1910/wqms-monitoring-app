import React from "react";
import styles from "./index.module.scss";
import { Navbar } from "../../components";

const Dashboard: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.content}>hi dashboard</div>
      </div>
    </>
  );
};

export default Dashboard;
