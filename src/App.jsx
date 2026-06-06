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
          <Route path="/" element={
            <>
              <Navigation />
              <main className="flex-grow">
                <Home />
              </main>
              <Footer />
            </>
          } />
          <Route path="/portfolio" element={
            <>
              <Navigation />
              <main className="flex-grow">
                <Portfolio />
              </main>
              <Footer />
            </>
          } />
          <Route path="/booking" element={
            <>
              <Navigation />
              <main className="flex-grow">
                <Booking />
              </main>
              <Footer />
            </>
          } />
          <Route path="/team" element={
            <>
              <Navigation />
              <main className="flex-grow">
                <Team />
              </main>
              <Footer />
            </>
          } />
          <Route path="/feedback" element={
            <>
              <Navigation />
              <main className="flex-grow">
                <Feedback />
              </main>
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
