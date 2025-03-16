import {BrowserRouter,Routes, Route} from 'react-router-dom';
import Header from './pages/Header';
import Home from './pages/Home';
import Metamask from './pages/Metamasklog';
import IncomeManagement from './pages/IncomeManagement';
import IncomeRecordsPage from './pages/IncomeRecordsPage';
// import Sidebar from './components/Sidebar';


function App() {
  return(
    <BrowserRouter>
        <Header/>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Metamask/>} />
            <Route path="/income" element={<IncomeManagement />} />
            <Route path="/records" element={<IncomeRecordsPage />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
