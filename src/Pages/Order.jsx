import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../styles/Pages/Order.css';

export default function Order() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { product, selectedStorage, selectedColor, quantity } = state || {};

  const [form, setForm] = useState({
    fullName: '',
    company: '',
    phone: '',
    location: '',
    email: '',
    additionalInfo: '',
  });

  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  const total = product?.price || 'N/A';

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!agreed) return alert('Please agree to the privacy policy.');

  setLoading(true);

  try {
    const res = await fetch("https://eddtechaccessories-backend.vercel.app/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        product_name: product.name,
        storage: selectedStorage,
        color: selectedColor,
        quantity,
        price: total,

        full_name: form.fullName,
        phone: form.phone,
        email: form.email,
        location: form.location,
        company: form.company,
        notes: form.additionalInfo
      })
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error);

    navigate('/order-success', {
      state: { form, product, selectedStorage, selectedColor, quantity, total }
    });

  } catch (err) {
    alert(err.message);
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="order-page">
      <h1 className="order-title">Ordering</h1>

      <form className="order-grid" onSubmit={handleSubmit}>

        {/* LEFT — Billing */}
        <div className="order-card">
          <h2 className="order-card__title">Billing Details</h2>

          <div className="order-field">
            <label>Full Name <span>*</span></label>
            <input name="fullName" type="text" placeholder="John Doe" value={form.fullName} onChange={handleChange} required />
          </div>
          <div className="order-field">
            <label>Company <em>(optional)</em></label>
            <input name="company" type="text" placeholder="Your company" value={form.company} onChange={handleChange} />
          </div>
          <div className="order-field">
            <label>Phone Number <span>*</span></label>
            <input name="phone" type="tel" placeholder="+254 700 000 000" value={form.phone} onChange={handleChange} required />
          </div>
          <div className="order-field">
            <label>Delivery Location <span>*</span></label>
            <input name="location" type="text" placeholder="e.g. Nairobi, Westlands" value={form.location} onChange={handleChange} required />
          </div>
          <div className="order-field">
            <label>Email Address <span>*</span></label>
            <input name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} required />
          </div>
          <div className="order-field">
            <label>Additional Information</label>
            <textarea name="additionalInfo" placeholder="Special delivery instructions..." value={form.additionalInfo} onChange={handleChange} />
          </div>
        </div>

        {/* RIGHT — Order Summary */}
        <div className="order-card">
          <h2 className="order-card__title">Your Order</h2>

          <div className="order-summary__header">
            <span>Product</span>
            <span>Subtotal</span>
          </div>

          <div className="order-summary__row">
            <div>
              <p className="order-summary__name">{product.name}</p>
              <p className="order-summary__meta">
                {selectedColor} · {selectedStorage} · Qty: {quantity}
              </p>
            </div>
            <p className="order-summary__price">{total}</p>
          </div>

          <div className="order-summary__total">
            <span>Total</span>
            <span>{total}</span>
          </div>

          <div className="order-payment">
            <div className="order-payment__radio">
              <div className="order-radio-dot"><div className="order-radio-inner" /></div>
              <span>Cash on Delivery</span>
            </div>
          </div>

          <label className="order-privacy">
            <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} />
            <span>I have read and agree to the <Link to="/privacy-policy">Privacy Policy</Link></span>
          </label>

          <button type="submit" className="order-btn-place" disabled={loading}>
            {loading ? 'Placing Order...' : 'Place Order'}
          </button>
        </div>

      </form>
    </div>
  );
}
