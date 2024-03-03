import React from "react";
import { Route, Routes } from "react-router-dom";
import styles from "./styles/app.module.scss";

import { Dashboard, Home, Graph, UserInfo } from "./pages";
const App: React.FC = () => {
  return (
    <div className={styles.container}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Graph" element={<Graph />} />
        <Route path="/UserInfo" element={<UserInfo />} />
      </Routes>
    </div>
  );
};

export default App;
