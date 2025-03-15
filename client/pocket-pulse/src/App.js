import React from 'react';
import {BrowserRouter,Routes, Route} from 'react-router-dom';
import Header from './pages/Header';
import Home from './pages/Home';
import Metamask from './pages/Metamasklog';

function App() {
  return(
    <BrowserRouter>
        <Header/>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Metamask/>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
