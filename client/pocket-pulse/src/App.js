import {BrowserRouter,Routes, Route} from 'react-router-dom';
import Header from './pages/Header';
import Home from './pages/Home';
import Metamask from './pages/Metamasklog';
import IncomeManagement from './pages/IncomeManagement';
import IncomeRecordsPage from './pages/IncomeRecordsPage';
import EditIncomePage from './pages/EditIncomePage'; // <-- new page
import WhatIfScenarioPlanner from './pages/WhatIfScenarioPlanner'; // new page

function App() {
  return(
    <BrowserRouter>
        <Header/>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Metamask/>} />
            <Route path="/income" element={<IncomeManagement />} />
            <Route path="/records" element={<IncomeRecordsPage />} />
            {/* This route includes a parameter :rowIndex */}
            <Route path="/what-if" element={<WhatIfScenarioPlanner />} />
            <Route path="/edit-income/:rowIndex" element={<EditIncomePage />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
