import React from "react";
import styles from "./index.module.scss";
import { Link } from "react-router-dom"; // Assuming you're using React Router for navigation

// Image
import LOGOPNG from "/src/images/logo-big.png";
import MenuBurger from "/src/images/menu-burger.png";
import HomePNG from "/src/images/home.png";
import GaugePNG from "/src/images/dashboard.png";
import StatsPNG from "/src/images/stats.png";
import LogoutPNG from "/src/images/logout.png";


// Functional component for the Navbar
const Navbar: React.FC = () => {
  return (
    <div className={styles.container}>

      {/* Left side of the navbar */}
      <div className={styles.navGroupLeft}>
        <div className={styles.imgMenu}>
          <Link to="/">
            <img src={MenuBurger} alt="Menu" className={styles.menu} />
          </Link>
        </div>
        <div className={styles.imgLogo}>
          <Link to="/">
            <img src={LOGOPNG} alt="LOGOPNG" className={styles.logo} />
          </Link>
        </div>
      </div>

      {/* Right side of the navbar */}
      <div className={styles.navGroupRight}>

        {/* Link to the homepage */}
        <Link to="/" style={{ textDecoration: "none" }}>
          <div className={styles.menuContent}>
            <img src={HomePNG} alt="Home" />
            HOME
          </div>
        </Link>

        {/* Link to the dashboard */}
        <Link to="/dashboard" style={{ textDecoration: "none" }}>
          <div className={styles.menuContent}>
            <img src={GaugePNG} alt="Dashboard" />
            DASHBOARD
          </div>
        </Link>

        {/* Link to the graph page */}
        <Link to="/graph" style={{ textDecoration: "none" }}>
          <div className={styles.menuContent}>
            <img src={StatsPNG} alt="Stats" />
            GRAPH
          </div>
        </Link>

        {/* Link to the logout page */}
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
