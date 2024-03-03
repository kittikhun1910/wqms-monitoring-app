import React from "react";
import styles from "./index.module.scss";
import { Navbar } from "../../components";
import ShimpPondPNG from "/src/images/shimp-pond.jpg";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.contentLeft}>
          <img src={ShimpPondPNG} alt="ShimpPondPNG" />
        </div>
        <div className={styles.contentRight}>
          <div className={styles.header}>
            <h1>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque,
              et.
            </h1>
          </div>
          <Link to={"/Login"} style={{ textDecoration: "none" }}>
            <div className={styles.buttonGetStart}>Get Started</div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
