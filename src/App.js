// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import RoutesPage from './components/RoutesPage';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Mangalore Public Transport Scheduling</h1>
        </header>
        <nav>
          <Link to="/">Home</Link> | <Link to="/routes">Routes</Link>
        </nav>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/routes" element={<RoutesPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
