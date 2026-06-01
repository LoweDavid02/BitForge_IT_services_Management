import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import Booking from './pages/Booking';
import Team from './pages/Team';
import Feedback from './pages/Feedback';
import Admin from './pages/Admin';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-bg-primary text-text-primary">
        <Routes>
          {/* Admin route without navigation */}
          <Route path="/admin" element={<Admin />} />
          
          {/* Regular routes with navigation */}
          <Route
            path="/*"
            element={
              <>
                <Navigation />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/portfolio" element={<Portfolio />} />
                  <Route path="/booking" element={<Booking />} />
                  <Route path="/team" element={<Team />} />
                  <Route path="/feedback" element={<Feedback />} />
                </Routes>
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
