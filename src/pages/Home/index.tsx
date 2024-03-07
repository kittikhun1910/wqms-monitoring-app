import React, { useState, useEffect } from "react";
import styles from "./index.module.scss";
import { Navbar } from "../../components";

import DesktopPrototypePNG from "/src/images/desktop-prototype.png";
import MobilePrototypePNG from "/src/images/mobile_prototype.png";
import CartoonCute3ShimpPNG from "/src/images/water-pond-shimp.jpg";
import CartoonCute3Shimp2PNG from "/src/images/water-pond-shimp2.jpg";
import CartoonCute3Shimp3PNG from "/src/images/water-pond-shimp3.jpg";
import CartoonCute3Shimp4PNG from "/src/images/water-pond-shimp4.jpg";
import CartoonCute3Shimp5PNG from "/src/images/water-pond-shimp5.jpg";
import CartoonCute3Shimp6PNG from "/src/images/water-pond-shimp6.jpg";
import CartoonCute3Shimp7PNG from "/src/images/water-pond-shimp7.jpg";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    CartoonCute3ShimpPNG,
    CartoonCute3Shimp2PNG,
    CartoonCute3Shimp3PNG,
    CartoonCute3Shimp4PNG,
    CartoonCute3Shimp5PNG,
    CartoonCute3Shimp6PNG,
    CartoonCute3Shimp7PNG,
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.imgBoxRight}>
          <img
            src={images[currentImageIndex]}
            alt="DesktopPrototypePNG"
            className={styles.imgBoxDesktop}
          />
          <Link to="/Login" style={{ textDecoration: "none" }}>
            <h1 className={styles.text}> Get Started</h1>
          </Link>
        </div>
        <div className={styles.content}>
          <div className={styles.imgBoxLeft}>
            <img
              src={MobilePrototypePNG}
              alt="MobilePrototypePNG"
              className={styles.imgMobile}
            />
            <div className={styles.imgText}>
              <img
                src={DesktopPrototypePNG}
                alt="CartoonCute3ShimpPNG"
                className={styles.shimpImg}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
