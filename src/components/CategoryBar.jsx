import { useState, useEffect, useRef } from 'react';
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
      { label: 'Oppo', path: '/oppo' },
      { label: 'Redmi', path: '/redmi' },
      { label: 'Neon', path: '/neon' },
      { label: 'Infinix', path: '/infinix' },
    ],
  },
  {
    label: 'Laptops & Tablets',
    icon: '💻',
    dropdown: [
      { label: 'Laptop', path: '/laptops' },
      { label: 'Tablet', path: '/tablets' },
    ],
  },
  {
    label: 'Chargers',
    icon: '🔌',
    dropdown: [
      { label: 'Laptop Chargers', path: '/laptop-chargers' },
      { label: 'Phone Chargers', path: '/phone-chargers' },
      { label: 'Car Chargers', path: '/car-chargers' },
      { label: 'Powerbank', path: '/powerbank' },
    ],
  },
  {
    label: 'Audio',
    icon: '🎵',
    dropdown: [
      { label: 'Speakers', path: '/speakers' },
      { label: 'Headphones', path: '/headphones' },
      { label: 'Earbuds', path: '/earbuds' },
      { label: 'Earphones', path: '/earphones' },
    ],
  },
  {
    label: 'Accessories',
    icon: '🧩',
    dropdown: [
      { label: 'Phone Cases', path: '/phone-cases' },
      { label: 'Screen Protectors', path: '/screen-protectors' },
      { label: 'Clocks', path: '/clocks' },
      { label: 'Flashdisks', path: '/flashdisks' },
      { label: 'Memory Cards', path: '/memorycards' },
      { label: 'Watches', path: '/watches' },
      { label: 'Addons', path: '/addons' },
    ],
  },
  { label: 'Services', icon: '🔧', path: '/services' },
  { label: 'About', icon: '📋', path: '/about' },
];

export default function CategoryBar() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });
  const [mobileMenu, setMobileMenu] = useState(false);
  const catbarRef = useRef(null);
  const closeTimer = useRef(null);
  const wrapperRefs = useRef({});

  const isDesktop = () => window.innerWidth > 1024;

  /* CLOSE WHEN CLICKING OUTSIDE */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (catbarRef.current && !catbarRef.current.contains(e.target)) {
        setMobileMenu(false);
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 150);
  };

  /* DESKTOP — open with position calculation */
  const handleMouseEnter = (label) => {
    if (!isDesktop()) return;
    cancelClose();

    // Calculate position from the wrapper element
    const wrapper = wrapperRefs.current[label];
    if (wrapper) {
      const rect = wrapper.getBoundingClientRect();
      setDropdownPos({ top: rect.bottom + 6, left: rect.left });
    }
    setOpenDropdown(label);
  };

  /* DESKTOP — close with delay */
  const handleMouseLeave = () => {
    if (!isDesktop()) return;
    scheduleClose();
  };

  /* MOBILE — click toggle */
  const toggleDropdown = (label) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  return (
    <div className="catbar" ref={catbarRef}>
      <div className="catbar__inner">
        <div className="catbar__left">
          <span className="catbar__label">Browse:</span>

          {/* DESKTOP PILLS */}
          <div className="catbar__pills">
            {categories.map((cat) => (
              <div
                key={cat.label}
                className="cat-pill-wrapper"
                ref={(el) => { if (el) wrapperRefs.current[cat.label] = el; }}
                onMouseEnter={() => cat.dropdown && handleMouseEnter(cat.label)}
                onMouseLeave={() => cat.dropdown && handleMouseLeave()}
              >
                {cat.path ? (
                  <NavLink
                    to={cat.path}
                    className={({ isActive }) =>
                      `cat-pill ${isActive ? 'cat-pill--active' : ''}`
                    }
                  >
                    <span className="cat-pill__icon">{cat.icon}</span>
                    {cat.label}
                  </NavLink>
                ) : (
                  <button
                    className={`cat-pill ${openDropdown === cat.label ? 'cat-pill--active' : ''}`}
                  >
                    <span className="cat-pill__icon">{cat.icon}</span>
                    {cat.label}
                    <span className={`cat-pill__arrow ${openDropdown === cat.label ? 'cat-pill__arrow--open' : ''}`}>
                      ▾
                    </span>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* MOBILE HAMBURGER */}
        <button
          className={`catbar__toggle ${mobileMenu ? 'active' : ''}`}
          onClick={() => setMobileMenu(!mobileMenu)}
          aria-label="Toggle menu"
        >
          <div className="catbar__hamburger">
            <span></span><span></span><span></span>
          </div>
        </button>
      </div>

      {/* DESKTOP DROPDOWN — rendered at root level, position: fixed */}
      {openDropdown && categories.find(c => c.label === openDropdown)?.dropdown && (
        <div
          className="cat-dropdown"
          style={{ top: dropdownPos.top, left: dropdownPos.left }}
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
        >
          {categories
            .find(c => c.label === openDropdown)
            .dropdown.map((item) => (
              <NavLink
                key={item.label}
                to={item.path}
                className={({ isActive }) =>
                  `cat-dropdown__item ${isActive ? 'cat-dropdown__item--active' : ''}`
                }
                onClick={() => setOpenDropdown(null)}
              >
                {item.label}
              </NavLink>
            ))}
        </div>
      )}

      {/* MOBILE MENU */}
      <div className={`catbar__mobile ${mobileMenu ? 'active' : ''}`}>
        {categories.map((cat) => (
          <div key={cat.label}>
            {cat.path ? (
              <NavLink
                to={cat.path}
                className={({ isActive }) =>
                  `cat-pill ${isActive ? 'cat-pill--active' : ''}`
                }
                onClick={() => { setMobileMenu(false); setOpenDropdown(null); }}
              >
                <span className="cat-pill__icon">{cat.icon}</span>
                {cat.label}
              </NavLink>
            ) : (
              <>
                <button
                  className={`cat-pill ${openDropdown === cat.label ? 'cat-pill--active' : ''}`}
                  onClick={() => toggleDropdown(cat.label)}
                >
                  <span className="cat-pill__icon">{cat.icon}</span>
                  {cat.label}
                  <span className={`cat-pill__arrow ${openDropdown === cat.label ? 'cat-pill__arrow--open' : ''}`}>
                    ▾
                  </span>
                </button>

                {cat.dropdown?.length > 0 && openDropdown === cat.label && (
                  <div className="cat-dropdown cat-dropdown--mobile">
                    {cat.dropdown.map((item) => (
                      <NavLink
                        key={item.label}
                        to={item.path}
                        className={({ isActive }) =>
                          `cat-dropdown__item ${isActive ? 'cat-dropdown__item--active' : ''}`
                        }
                        onClick={() => { setMobileMenu(false); setOpenDropdown(null); }}
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