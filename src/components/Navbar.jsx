import {
  useState,
  useEffect,
  useRef,
} from 'react';

import { Link } from 'react-router-dom';

import '../styles/Navbar.css';

export default function Navbar() {
  const [menuOpen, setMenuOpen] =
    useState(false);

  const navbarRef = useRef(null);

  /* CLOSE MENU WHEN CLICKING OUTSIDE */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener(
      'mousedown',
      handleClickOutside
    );

    document.addEventListener(
      'touchstart',
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        'mousedown',
        handleClickOutside
      );

      document.removeEventListener(
        'touchstart',
        handleClickOutside
      );
    };
  }, []);

  return (
    <header
      className="navbar"
      ref={navbarRef}
    >
      <div className="navbar__inner">
        {/* BRAND */}
        <Link
          to="/"
          className="navbar__brand"
          onClick={() => setMenuOpen(false)}
        >
          EDD
          <span>Tech&ACCESSORIES</span>
        </Link>

        {/* NAV LINKS */}
        <nav
          className={`navbar__links ${
            menuOpen
              ? 'navbar__links--open'
              : ''
          }`}
        >
          <Link
            to="/contact"
            className="navbar__link"
            onClick={() => setMenuOpen(false)}
          >
            Contact Us
          </Link>

          <a
            href="#"
            className="navbar__link navbar__link--wa"
            onClick={() => setMenuOpen(false)}
          >
            <span className="wa-dot" />
            WhatsApp
          </a>

          <div className="navbar__divider" />

          <Link
            to="/login"
            className="navbar__link"
            onClick={() => setMenuOpen(false)}
          >
            Login
          </Link>

          <Link
            to="/register"
            className="navbar__link"
            onClick={() => setMenuOpen(false)}
          >
            Register
          </Link>
        </nav>

        {/* HAMBURGER */}
        <button
          className={`navbar__hamburger ${
            menuOpen ? 'active' : ''
          }`}
          onClick={() =>
            setMenuOpen((o) => !o)
          }
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