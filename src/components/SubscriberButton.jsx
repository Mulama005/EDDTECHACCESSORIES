import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SubscriberButton.css';

export default function SubscribeButton() {
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading]       = useState(false);
  const [message, setMessage]       = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) return;
    fetch('http://localhost:5000/api/subscription/status', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(r => r.json())
      .then(d => setSubscribed(d.subscribed));
  }, [token]);

  const handleClick = async () => {
    if (!token) {
      navigate('/login', { state: { from: '/', reason: 'subscribe' } });
      return;
    }

    setLoading(true);
    setMessage('');

    const url = subscribed
      ? 'http://localhost:5000/api/unsubscribe'
      : 'http://localhost:5000/api/subscribe';

    try {
      const res  = await fetch(url, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();

      if (res.ok) {
        setSubscribed(!subscribed);
        setMessage(data.message);
      } else {
        setMessage(data.error);
      }
    } catch {
      setMessage('Something went wrong. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div className="subscribe-wrap">
      <button
        className={`subscribe-btn ${subscribed ? 'subscribe-btn--active' : ''}`}
        onClick={handleClick}
        disabled={loading}
      >
        {loading ? 'Please wait...' : subscribed ? '✓ Subscribed' : '🔔 Subscribe for Deals'}
      </button>
      {message && (
        <p className={`subscribe-msg ${subscribed ? 'subscribe-msg--success' : 'subscribe-msg--info'}`}>
          {message}
        </p>
      )}
      {!token && (
        <p className="subscribe-hint">
          <span onClick={() => navigate('/login')} className="subscribe-link">Log in</span> or{' '}
          <span onClick={() => navigate('/register')} className="subscribe-link">register</span> to subscribe.
        </p>
      )}
    </div>
  );
}