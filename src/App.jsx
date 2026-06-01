import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import Booking from './pages/Booking';
import Team from './pages/Team';
import Feedback from './pages/Feedback';
import Admin from './pages/Admin';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-bg-primary text-text-primary flex flex-col">
        <Routes>
          {/* Admin route without navigation and footer */}
          <Route path="/admin" element={<Admin />} />
          
          {/* Regular routes with navigation and footer */}
          <Route
            path="/*"
            element={
              <>
                <Navigation />
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/portfolio" element={<Portfolio />} />
                    <Route path="/booking" element={<Booking />} />
                    <Route path="/team" element={<Team />} />
                    <Route path="/feedback" element={<Feedback />} />
                  </Routes>
                </main>
                <Footer />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
