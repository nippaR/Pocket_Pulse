import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './pages/Header';
import Home from './pages/Home';
import Metamask from './pages/Metamasklog';
import IncomeManagement from './pages/IncomeManagement';
import IncomeRecordsPage from './pages/IncomeRecordsPage';
import EditIncomePage from './pages/EditIncomePage';
import WhatIfScenarioPlanner from './pages/WhatIfScenarioPlanner';

function App() {
  return (
    <BrowserRouter>
      <MainContent />
    </BrowserRouter>
  );
}

function MainContent() {
  const location = useLocation();

  const noHeaderFooterPaths = ['/login', '/records'];
  const isNoHeaderFooterPage = noHeaderFooterPaths.includes(location.pathname);

  return (
    <>
      {/* Conditionally render the header based on the current path */}
      {!isNoHeaderFooterPage && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Metamask />} />
        <Route path="/income" element={<IncomeManagement />} />
        <Route path="/records" element={<IncomeRecordsPage />} />
        <Route path="/what-if" element={<WhatIfScenarioPlanner />} />
        <Route path="/edit-income/:rowIndex" element={<EditIncomePage />} />
      </Routes>
    </>
  );
}

export default App;
