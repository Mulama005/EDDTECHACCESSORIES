import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/CookieConsent.css';

// Generate or retrieve a persistent anonymous session ID
function getSessionId() {
  let id = localStorage.getItem('edd_session_id');
  if (!id) {
    id = 'sess_' + Date.now() + '_' + Math.random().toString(36).slice(2, 9);
    localStorage.setItem('edd_session_id', id);
  }
  return id;
}

export default function CookieConsent() {
  const [visible, setVisible]   = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [leaving, setLeaving]   = useState(false);

  const [prefs, setPrefs] = useState({
    necessary:  true,
    analytics:  false,
    functional: false,
    marketing:  false,
  });

  useEffect(() => {
    const consent = localStorage.getItem('edd_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const saveToBackend = async (type, selectedPrefs) => {
    try {
      const token     = localStorage.getItem('token');
      const sessionId = getSessionId();

      await fetch('http://localhost:5000/api/consent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({
          session_id:   sessionId,
          consent_type: type,
          prefs:        selectedPrefs,
        })
      });
    } catch (err) {
      // Fail silently — don't block the UI if backend is down
      console.warn('Could not save consent to server:', err.message);
    }
  };

  const dismiss = async (type) => {
    const finalPrefs =
      type === 'all'
        ? { necessary: true, analytics: true, functional: true, marketing: true }
        : type === 'necessary'
        ? { necessary: true, analytics: false, functional: false, marketing: false }
        : prefs;

    // Save to localStorage
    localStorage.setItem('edd_cookie_consent', type);
    localStorage.setItem('edd_cookie_prefs', JSON.stringify(finalPrefs));

    // Save to backend database
    await saveToBackend(type, finalPrefs);

    // Animate out
    setLeaving(true);
    setTimeout(() => {
      setVisible(false);
      setLeaving(false);
    }, 400);
  };

  if (!visible) return null;

  return (
    <div className={`cc-overlay ${leaving ? 'cc-overlay--leaving' : ''}`}>
      <div className={`cc-banner ${leaving ? 'cc-banner--leaving' : ''}`}>

        <div className="cc-top">
          <div className="cc-icon">🍪</div>
          <div className="cc-intro">
            <h2 className="cc-title">We value your privacy</h2>
            <p className="cc-desc">
              EDD Tech & Accessories uses cookies to enhance your browsing experience,
              analyse site traffic, and personalise content. By clicking{" "}
              <strong>"Accept All"</strong>, you consent to our use of cookies.
              You can manage your preferences or learn more in our{" "}
              <Link to="/privacy-policy" className="cc-link" onClick={() => dismiss('necessary')}>
                Privacy Policy
              </Link>.
            </p>
          </div>
        </div>

        {expanded && (
          <div className="cc-prefs">
            <div className="cc-prefs__grid">

              <div className="cc-pref-item cc-pref-item--locked">
                <div className="cc-pref-info">
                  <span className="cc-pref-name">Strictly Necessary</span>
                  <span className="cc-pref-desc">Required for the website to function. Cannot be disabled.</span>
                </div>
                <div className="cc-toggle cc-toggle--on cc-toggle--locked">
                  <span>Always On</span>
                </div>
              </div>

              {[
                { key: 'analytics',  label: 'Analytics Cookies',  desc: 'Help us understand how visitors interact with our website.' },
                { key: 'functional', label: 'Functional Cookies',  desc: 'Remember your preferences and settings across visits.' },
                { key: 'marketing',  label: 'Marketing Cookies',   desc: 'Used to show you relevant ads and promotional content.' },
              ].map(({ key, label, desc }) => (
                <div key={key} className="cc-pref-item">
                  <div className="cc-pref-info">
                    <span className="cc-pref-name">{label}</span>
                    <span className="cc-pref-desc">{desc}</span>
                  </div>
                  <button
                    className={`cc-toggle ${prefs[key] ? 'cc-toggle--on' : ''}`}
                    onClick={() => setPrefs(p => ({ ...p, [key]: !p[key] }))}
                    aria-label={`Toggle ${label}`}
                  >
                    <span className="cc-toggle__knob" />
                  </button>
                </div>
              ))}

            </div>
          </div>
        )}

        <div className="cc-actions">
          <button className="cc-btn cc-btn--ghost" onClick={() => setExpanded(e => !e)}>
            {expanded ? 'Hide Settings ▲' : 'Manage Preferences ▼'}
          </button>
          <div className="cc-btn-group">
            <button className="cc-btn cc-btn--outline" onClick={() => dismiss('necessary')}>
              Necessary Only
            </button>
            {expanded && (
              <button className="cc-btn cc-btn--secondary" onClick={() => dismiss('custom')}>
                Save My Choices
              </button>
            )}
            <button className="cc-btn cc-btn--primary" onClick={() => dismiss('all')}>
              Accept All
            </button>
          </div>
        </div>

        <div className="cc-compliance">
          <span>🇰🇪 Compliant with the Data Protection Act, 2019 (Kenya)</span>
        </div>

      </div>
    </div>
  );
}