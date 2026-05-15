import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="p5-header">
      <div className="logo-container jagged-border">
        <Link to="/" className="logo-text text-stroke">PORTFOLIO</Link>
      </div>
      <nav className="nav-links">
        <Link to="/" className="nav-item jagged-border-alt">HOME</Link>
        <Link to="/about" className="nav-item jagged-border-alt">ABOUT</Link>
      </nav>
    </header>
  );
};

export default Header;
