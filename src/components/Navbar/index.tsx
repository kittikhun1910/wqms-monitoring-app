import React from "react";
import styles from "./index.module.scss";
import { Link } from "react-router-dom"; // Assuming you're using React Router for navigation

// Image
import LOGOPNG from "/src/images/logo-big.png";
import HomePNG from "/src/images/home.png";
import GaugePNG from "/src/images/dashboard.png";
import StatsPNG from "/src/images/stats.png";
import LogoutPNG from "/src/images/logout.png";

const Navbar: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.navGroupLeft}>
        <div className={styles.imgLogo}>
          <Link to="/">
            <img src={LOGOPNG} alt="LOGOPNG" className={styles.logo} />
          </Link>
        </div>
      </div>
      <div className={styles.navGroupRight}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <div className={styles.menuContent}>
            <img src={HomePNG} alt="Home" />
            HOME
          </div>
        </Link>
        <Link to="/dashboard" style={{ textDecoration: "none" }}>
          <div className={styles.menuContent}>
            <img src={GaugePNG} alt="Dashboard" />
            DASHBOARD
          </div>
        </Link>
        <Link to="/graph" style={{ textDecoration: "none" }}>
          <div className={styles.menuContent}>
            <img src={StatsPNG} alt="Stats" />
            GRAPH
          </div>
        </Link>
        <Link to="/logout" style={{ textDecoration: "none" }}>
          <div className={styles.menuContent}>
            <img src={LogoutPNG} alt="User" />
            LOGOUT
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
