import React from 'react';
// import { readFileSync } from 'xlsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import AuditionData from './AuditionDataPage';

function App() {
  
  
  return ( 
    <Router>
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/audition-data" element={<AuditionData />} /> 
      </Routes>
    </div>
    </Router>
  );
}

export default App;
