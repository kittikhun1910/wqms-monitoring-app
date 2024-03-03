import React from "react";
import styles from "./index.module.scss";
import { Navbar } from "../../components";

const UserInfo: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.content}>hi UserInfo</div>
      </div>
    </>
  );
};

export default UserInfo;
