import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import IncomeManagement from './pages/IncomeManagement';

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing page (/) -> Dashboard */}
        <Route path="/" element={<Dashboard />} />

        {/* /income -> IncomeManagement page */}
        <Route path="/income" element={<IncomeManagement />} />
      </Routes>
    </Router>
import {BrowserRouter,Routes, Route} from 'react-router-dom';
import Header from './pages/Header';
import Home from './pages/Home';

function App() {
  return(
    <BrowserRouter>
        <Header/>
        <Routes>
            <Route path="/" element={<Home />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
