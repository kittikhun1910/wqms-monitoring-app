import React from "react";
import styles from "./index.module.scss";
import { Navbar } from "../../components";
import Verify from "../components/Verify";

const UserInfo: React.FC = () => {
  return (
    <Verify>
      <>
        <Navbar />
        <div className={styles.container}>
          <div className={styles.content}>hi UserInfo</div>
        </div>
      </>
    </Verify>
  );
};

export default UserInfo;
