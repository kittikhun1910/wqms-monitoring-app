import React from "react";
import styles from "./index.module.scss";
import { Navbar } from "../../components";

const Home: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.content}>hi Home</div>
      </div>
    </>
  );
};

export default Home;
