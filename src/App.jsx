import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';
import Works from './pages/Works';
import CallingCard from './pages/CallingCard';
import ProjectDetails from './pages/ProjectDetails';
import P5SloganRibbon from './components/P5SloganRibbon';
import './App.css';

// Main Scrolling Single Page Component
const MainPortfolio = ({ activeView, setActiveView }) => {
  // Scroll to top on mount (e.g. when navigating back from ProjectDetails)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Monitor scroll positioning to update active section in header nav
  useEffect(() => {
    const sections = ['home', 'programmer', 'works', 'card'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px', // Center viewport bias
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveView(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [setActiveView]);

  const handleNavClick = (id) => {
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveView(id);
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveView(id);
    }
  };

  return (
    <>
      {/* Header Menu */}
      <Header activeView={activeView} onNavClick={handleNavClick} />
      
      {/* Scrollable Layout sections */}
      <main>
        <div id="home">
          <Home activeView={activeView} onNavClick={handleNavClick} />
        </div>
        
        <div id="programmer">
          <About onNavClick={handleNavClick} />
        </div>
        
        <div id="works">
          {/* We pass undefined for project click because Works will use useNavigate directly */}
          <Works onProjectClick={undefined} onNavClick={handleNavClick} />
        </div>
        
        <div id="card">
          <CallingCard onNavClick={handleNavClick} />
        </div>
      </main>
    </>
  );
};

// Main Routing App Component
function App() {
  const [activeView, setActiveView] = useState('home');

  return (
    <Router>
      <div className={`app-container view-${activeView}`}>
        {/* Dynamic full-screen background */}
        <div className="p5-bg-canvas">
          <div className="p5-bg-stripes"></div>
          <div className="p5-bg-halftone"></div>
          <div className="p5-bg-spiral"></div>
          <P5SloganRibbon activeView={activeView} />
        </div>

        <Routes>
          {/* Main Landing Route */}
          <Route path="/" element={<MainPortfolio activeView={activeView} setActiveView={setActiveView} />} />
          
          {/* Dedicated Project Details Page Route */}
          <Route path="/project/:id" element={<ProjectDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
