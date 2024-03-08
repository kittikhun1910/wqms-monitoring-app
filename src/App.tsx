import React from "react";
import { Route, Routes } from "react-router-dom";
import styles from "./styles/app.module.scss";

import { Dashboard, Home, Graph, Logout, GraphPH, Login } from "./pages";
const App: React.FC = () => {
  return (
    <div className={styles.container}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/graph" element={<Graph />} />
        <Route path="/graphPH" element={<GraphPH />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
