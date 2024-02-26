import React from "react";
import { Route, Routes } from "react-router-dom";

import { Demo } from "./pages";
const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Demo />} />
      </Routes>
    </>
  );
};

export default App;
