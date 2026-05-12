import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/CategoryBar.css';

const categories = [
  { label: 'Home', icon: '🏠', path: '/' },

  {
    label: 'Smartphones',
    icon: '📱',
    dropdown: [
      { label: 'iPhone', path: '/iphone' },
      { label: 'Tecno', path: '/tecno' },
      { label: 'Samsung', path: '/samsung' },
      { label: 'Infinix', path: '/infinix' },
    ],
  },

  { label: 'Gaming', icon: '🎮', path: '/gaming' },

  {
    label: 'Accessories',
    icon: '🎧',
    dropdown: [
      { label: 'Headphones', path: '/headphones' },
      { label: 'Earbuds', path: '/earbuds' },
      { label: 'Earphones', path: '/earphones' },
    ],
  },

  {
    label: 'Laptops & Tablets',
    icon: '💻',
    dropdown: [
      { label: 'Laptop', path: '/laptop' },
      { label: 'Tablet', path: '/tablet' },
    ],
  },

  {
    label: 'Chargers',
    icon: '🔌',
    dropdown: [
      { label: 'Laptop Chargers', path: '/laptop-chargers' },
      { label: 'Phone Chargers', path: '/phone-chargers' },
      { label: 'Powerbank', path: '/powerbank' },
    ],
  },

  { label: 'Audio', icon: '🎵', path: '/audio' },
  { label: 'Services', icon: '🔧', path: '/services' },
];

export default function CategoryBar() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(false);

  const handleMouseEnter = (label) => {
    if (window.innerWidth > 768) {
      setOpenDropdown(label);
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth > 768) {
      setOpenDropdown(null);
    }
  };

  const toggleDropdown = (label) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  return (
    <div className="catbar">
      <div className="catbar__inner">
        {/* LEFT */}
        <div className="catbar__left">
          <span className="catbar__label">Browse:</span>

          {/* DESKTOP MENU */}
          <div className="catbar__pills">
            {categories.map((cat) => (
              <div
                key={cat.label}
                className="cat-pill-wrapper"
                onMouseEnter={() =>
                  cat.dropdown && handleMouseEnter(cat.label)
                }
                onMouseLeave={handleMouseLeave}
              >
                {cat.path ? (
                  <NavLink
                    to={cat.path}
                    className={({ isActive }) =>
                      `cat-pill ${
                        isActive ? 'cat-pill--active' : ''
                      }`
                    }
                  >
                    <span className="cat-pill__icon">{cat.icon}</span>
                    {cat.label}
                  </NavLink>
                ) : (
                  <button
                    className={`cat-pill ${
                      openDropdown === cat.label
                        ? 'cat-pill--active'
                        : ''
                    }`}
                  >
                    <span className="cat-pill__icon">{cat.icon}</span>

                    {cat.label}

                    <span
                      className={`cat-pill__arrow ${
                        openDropdown === cat.label
                          ? 'cat-pill__arrow--open'
                          : ''
                      }`}
                    >
                      ▾
                    </span>
                  </button>
                )}

                {/* DESKTOP DROPDOWN */}
                {cat.dropdown &&
                  openDropdown === cat.label && (
                    <div className="cat-dropdown">
                      {cat.dropdown.map((item) => (
                        <NavLink
                          key={item.label}
                          to={item.path}
                          className={({ isActive }) =>
                            `cat-dropdown__item ${
                              isActive
                                ? 'cat-dropdown__item--active'
                                : ''
                            }`
                          }
                          onClick={() =>
                            setOpenDropdown(null)
                          }
                        >
                          {item.label}
                        </NavLink>
                      ))}
                    </div>
                  )}
              </div>
            ))}
          </div>
        </div>

        {/* MOBILE HAMBURGER */}
        <button
          className={`catbar__toggle ${
            mobileMenu ? 'active' : ''
          }`}
          onClick={() => setMobileMenu(!mobileMenu)}
        >
          <div className="catbar__hamburger">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`catbar__mobile ${
          mobileMenu ? 'active' : ''
        }`}
      >
        {categories.map((cat) => (
          <div key={cat.label}>
            {cat.path ? (
              <NavLink
                to={cat.path}
                className={({ isActive }) =>
                  `cat-pill ${
                    isActive ? 'cat-pill--active' : ''
                  }`
                }
                onClick={() => setMobileMenu(false)}
              >
                <span className="cat-pill__icon">
                  {cat.icon}
                </span>

                {cat.label}
              </NavLink>
            ) : (
              <>
                <button
                  className={`cat-pill ${
                    openDropdown === cat.label
                      ? 'cat-pill--active'
                      : ''
                  }`}
                  onClick={() =>
                    toggleDropdown(cat.label)
                  }
                >
                  <span className="cat-pill__icon">
                    {cat.icon}
                  </span>

                  {cat.label}

                  <span
                    className={`cat-pill__arrow ${
                      openDropdown === cat.label
                        ? 'cat-pill__arrow--open'
                        : ''
                    }`}
                  >
                    ▾
                  </span>
                </button>

                {/* MOBILE DROPDOWN */}
                {cat.dropdown &&
                  openDropdown === cat.label && (
                    <div className="cat-dropdown cat-dropdown--mobile">
                      {cat.dropdown.map((item) => (
                        <NavLink
                          key={item.label}
                          to={item.path}
                          className={({ isActive }) =>
                            `cat-dropdown__item ${
                              isActive
                                ? 'cat-dropdown__item--active'
                                : ''
                            }`
                          }
                          onClick={() => {
                            setMobileMenu(false);
                            setOpenDropdown(null);
                          }}
                        >
                          {item.label}
                        </NavLink>
                      ))}
                    </div>
                  )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}