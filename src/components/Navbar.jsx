import {
  useState,
  useEffect,
  useRef,
} from 'react';

import { Link, useNavigate } from 'react-router-dom';

import '../styles/Navbar.css';

export default function Navbar() {
  const [menuOpen, setMenuOpen] =
    useState(false);
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();

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

  useEffect(() => {
    const email = localStorage.getItem('email');
    if (email) {
      setUserEmail(email);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('email');

    setUserEmail('');
    setMenuOpen(false);

    navigate('/');
    window.location.reload();
  };

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
          {userEmail && (
            <div className="navbar__mobile-user">
              <div className="navbar__mobile-email">
                👤 {userEmail}
              </div>

              <button
                className="navbar__logout"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}

          <Link
            to="/contact"
            className="navbar__link"
            onClick={() => setMenuOpen(false)}
          >
            Contact Us
          </Link>

          

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

        {userEmail && (
          <div className="navbar__user">
            <span className="navbar__user-email">
              👤 {userEmail}
            </span>

            <button
              className="navbar__logout"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}

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