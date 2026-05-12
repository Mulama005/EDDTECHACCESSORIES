import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <a href="/" className="navbar__brand">
          EDD<span>Tech&ACCESSORIES</span>
        </a>

        <nav className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>
          <Link to="/contact" className="navbar__link">
          Contact Us
          </Link>
          <a href="#" className="navbar__link navbar__link--wa">
            <span className="wa-dot" />
            WhatsApp
          </a>
          <div className="navbar__divider" />
          <Link to="/login" className="navbar__link">
          Login
          </Link>
          <Link to="/register" className="navbar__link">
          Register
          </Link>
        </nav>

        <button
        className={`navbar__hamburger ${
          menuOpen ? 'active' : ''
        }`}
        onClick={() => setMenuOpen((o) => !o)}
        aria-label="Toggle menu"
        >
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
          </button>
          </div>
          </header>
          );
        
}