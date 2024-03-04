import React from "react";
import { Route, Routes } from "react-router-dom";
import styles from "./styles/app.module.scss";

import { Dashboard, Home, Graph, UserInfo, GraphPH, Login } from "./pages";
const App: React.FC = () => {
  return (
    <div className={styles.container}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Graph" element={<Graph />} />
        <Route path="/GraphPH" element={<GraphPH />} />
        <Route path="/UserInfo" element={<UserInfo />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
