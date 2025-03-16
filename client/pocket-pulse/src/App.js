// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import IncomeManagement from './pages/IncomeManagement';
import IncomeRecordsPage from './pages/IncomeRecordsPage';
import EditIncomePage from './pages/EditIncomePage'; // <-- new page
import WhatIfScenarioPlanner from './pages/WhatIfScenarioPlanner'; // new page

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing page (/) -> Dashboard */}
        <Route path="/" element={<Dashboard />} />

        {/* /income -> IncomeManagement page */}
        <Route path="/income" element={<IncomeManagement />} />
        <Route path="/records" element={<IncomeRecordsPage />} />
        {/* This route includes a parameter :rowIndex */}
        <Route path="/what-if" element={<WhatIfScenarioPlanner />} />
        <Route path="/edit-income/:rowIndex" element={<EditIncomePage />} />
        <Route
          path="/"
          element={<h2>Home page - go to /income or /records</h2>}
        />
      </Routes>
    </Router>
  );
}

export default App;
