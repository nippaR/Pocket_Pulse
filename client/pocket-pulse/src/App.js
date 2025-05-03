import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Header from './pages/Header';

import Footer from './components/FooterPage';
import Home from './pages/Home';
import Metamask from './pages/Metamasklog';
import IncomeManagement from './pages/IncomeManagement';

import IncomeRecordsPage from './pages/IncomeRecordsPage';
import EditIncomePage from './pages/EditIncomePage';

import WhatIfScenarioPlanner from './pages/WhatIfScenarioPlanner';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import Community from './pages/Community';

import Startup from './pages/investment-management/StartupPage';

import Formpage from './pages/investment-management/formpage';
import InvestmentDetails from './pages/investment-management/InvestmentDetails';
import CreateProject from './pages/investment-management/Createpro';
import Viewpro from './pages/investment-management/Viewpro';
import EditProject from './pages/investment-management/Editproject';

import RealEstateCrowdfundingPage from './pages/investment-management/RealEstateCrowdfundingPage';
import InvestmentProjects from './pages/investment-management/Investment';
const theme = createTheme({
  palette: {
    background: {
      paper: "#ffffff", // Adjust background color
    },
    primary: {
      main: "#1976d2", // Primary color
    },
    secondary: {
      main: "#9c27b0", // Secondary color
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <MainContent />
      </BrowserRouter>
    </ThemeProvider>
  );
}

function MainContent() {
  const location = useLocation();

  // Paths where header and footer should not appear
  const noHeaderFooterPaths = ['/login', '/records', '/signin', '/signup', '/what-if', '/income', '/community'];
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
        <Route path="/signin" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/community" element={<Community />} />
        <Route path="/investment-projects" element={<InvestmentProjects />} />
        <Route path="/start-up" element={<Startup />} />
        <Route path="/form-page" element={<Formpage />} />
        {/* Dynamic route for InvestmentDetails with projectId */}
        <Route path="/investment-details/:id" element={<InvestmentDetails />} />
        <Route path="/create-pro" element={<CreateProject />} />
        <Route path="/view-pro" element={<Viewpro />} />
        <Route path="/edit-project" element={<EditProject />} />
        <Route path="/real-page" element={< RealEstateCrowdfundingPage  />} />
      </Routes>

      {/* Conditionally render the footer based on the current path */}
      {!isNoHeaderFooterPage && <Footer />}
    </>
  );
}

export default App;
