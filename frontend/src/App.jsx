import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";

const App = () => {
  return (
    <Router>
      <div style={{ fontFamily: "Arial, sans-serif" }}>
        <Routes>
          {/* Route for the dashboard */}
          <Route path="/" element={<Dashboard />} />
          {/* Add more routes here if needed */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
