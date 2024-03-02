import React from "react";
import styles from "./index.module.scss";
import { Link } from "react-router-dom"; // Assuming you're using React Router for navigation

// Image
import LOGOPNG from "/src/images/logo.png";
import MenuBurger from "/src/images/menu-burger.png";
import HomePNG from "/src/images/home.png";
import GaugePNG from "/src/images/dashboard.png";
import StatsPNG from "/src/images/stats.png";
import UserPNG from "/src/images/user.png";

const Navbar: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.navGroupLeft}>
        <div className={styles.imgMenu}>
          <Link to="/Menu">
            <img src={MenuBurger} alt="Menu" className={styles.menu} />
          </Link>
        </div>
        <div className={styles.imgLogo}>
          <Link to="/">
            <img src={LOGOPNG} alt="LOGOPNG" className={styles.logo} />
          </Link>
        </div>
      </div>
      <div className={styles.navGroupRight}>
        <Link to="/Home" style={{ textDecoration: "none" }}>
          <div className={styles.menuContent}>
            <img src={HomePNG} alt="Home" />
            HOME
          </div>
        </Link>
        <Link to="/Dashboard" style={{ textDecoration: "none" }}>
          <div className={styles.menuContent}>
            <img src={GaugePNG} alt="Dashboard" />
            DASHBOARD
          </div>
        </Link>
        <Link to="/Stats" style={{ textDecoration: "none" }}>
          <div className={styles.menuContent}>
            <img src={StatsPNG} alt="Stats" />
            GRAPH
          </div>
        </Link>
        <Link to="/User" style={{ textDecoration: "none" }}>
          <div className={styles.menuContent}>
            <img src={UserPNG} alt="User" />
            USER
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
