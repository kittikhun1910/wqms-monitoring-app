import React from "react";
import styles from "./index.module.scss";

import { Navbar } from "../../components";

const Demo2: React.FC = () => {
  return (
    <div className={styles.container}>
      <Navbar/>
    </div>
  );
};

export default Demo2;
