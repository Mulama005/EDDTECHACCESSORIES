import { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Cart.css';
import '../styles/Pages/Order.css';

export default function CartOrder() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { cart, cartTotal, clearCart } = useCart();

  const pageCart = state?.cart ?? cart;
  const pageTotal = state?.cartTotal ?? cartTotal;

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

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreed) return alert('Please agree to the privacy policy.');
    setLoading(true);

    const results = [];

    for (const item of pageCart) {
      try {
        const res = await fetch('https://eddtechaccessories-backend.vercel.app/api/order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            product_name: item.name,
            storage: item.selectedStorage,
            color: item.selectedColor,
            quantity: item.quantity,
            price: item.price,
            full_name: form.fullName,
            phone: form.phone,
            email: form.email,
            location: form.location,
            company: form.company,
            notes: form.additionalInfo,
          }),
        });
        results.push(res.ok);
      } catch {
        results.push(false);
      }
    }

    setLoading(false);

    if (results.some(Boolean)) {
      clearCart();
      navigate('/order-success', {
        state: {
          form,
          isCartOrder: true,
          cart: pageCart,
          total: `Ksh ${pageTotal.toLocaleString()}`,
        },
      });
    } else {
      alert('Something went wrong. Please try WhatsApp directly.');
    }
  };

  if (!pageCart?.length) {
    return (
      <div className="cart-empty">
        <div className="cart-empty__icon">🛒</div>
        <h2>No items to checkout</h2>
        <button className="cart-empty__btn" onClick={() => navigate('/')}>Go Shopping</button>
      </div>
    );
  }

  return (
    <div className="order-page">
      <h1 className="order-title">Checkout</h1>

      <form className="order-grid" onSubmit={handleSubmit}>
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

        <div className="order-card">
          <h2 className="order-card__title">Your Order</h2>

          <div className="order-summary__header">
            <span>Product</span>
            <span>Subtotal</span>
          </div>

          {pageCart.map(item => {
            const itemTotal = parseInt(item.price.replace(/[^0-9]/g, ''), 10) * item.quantity;
            return (
              <div className="order-summary__row" key={item.cartId}>
                <div>
                  <p className="order-summary__name">{item.name}</p>
                  <p className="order-summary__meta">
                    {item.selectedColor} · {item.selectedStorage} · Qty: {item.quantity}
                  </p>
                </div>
                <p className="order-summary__price">Ksh {itemTotal.toLocaleString()}</p>
              </div>
            );
          })}

          <div className="order-summary__total">
            <span>Total</span>
            <span>Ksh {pageTotal.toLocaleString()}</span>
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
            {loading ? 'Placing Orders...' : `Place ${pageCart.length} Order${pageCart.length > 1 ? 's' : ''}`}
          </button>
        </div>
      </form>
    </div>
  );
}
