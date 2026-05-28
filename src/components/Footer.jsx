import { useState, useEffect } from 'react';
import '../styles/Footer.css';
import SubscriberButton from '../components/SubscriberButton';
import { Link } from 'react-router-dom';

export default function Footer() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem('role');
    setIsAdmin(role === 'admin');
  }, []);

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <div className="footer__logo">
            EDD<span>Tech&Accessories</span>
          </div>

          <p className="footer__tagline">
            Your trusted tech partner in Kenya.
          </p>
        </div>

        <div className="footer__links">
          {/* SHOP */}
          <div className="footer__col">
            <h4>Shop</h4>
            <Link to="/iphone">Smartphones</Link>
            <Link to="/laptop">Laptops & Tablets</Link>
            <Link to="/headphones">Accessories</Link>
            <Link to="/gaming">Gaming</Link>
          </div>

          {/* SUBSCRIBE */}
          <div className="footer__subscribe">
            <h4>Stay Updated</h4>
            <p>
              Get notified about new products and
              exclusive deals.
            </p>
            <SubscriberButton />
          </div>

          {/* SUPPORT */}
          <div className="footer__col">
            <h4>Support</h4>
            <Link to="/contact">Contact Us</Link>
            <a
              href="https://wa.me/2547118396533"
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>
            <Link to="/services">Services</Link>
          </div>

          {/* ACCOUNT */}
          <div className="footer__col">
            <h4>Account</h4>
            <Link to="/login">Log In</Link>
            <Link to="/register">Register</Link>

            {/* ADMIN ONLY */}
            {isAdmin && (
              <Link to="/admin/orders" className="footer__admin-link">
                 Admin Dashboard
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <p>
          © {new Date().getFullYear()} EDD Tech & Accessories.
          All rights reserved.
        </p>
      </div>
    </footer>
  );
}