import React from "react";
import styles from "./index.module.scss";
import { Navbar } from "../../components";

const Graph: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.content}>hi Graph</div>
      </div>
    </>
  );
};

export default Graph;
