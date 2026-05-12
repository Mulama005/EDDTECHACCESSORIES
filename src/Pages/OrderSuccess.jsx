import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/Pages/OrderSuccess.css';

export default function OrderSuccess() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { form, product, selectedStorage, selectedColor, quantity, total } = state || {};

  if (!state) {
    return (
      <div className="success-empty">
        <p>No order found.</p>
        <button onClick={() => navigate('/')}>Back to Home</button>
      </div>
    );
  }

  return (
    <div className="success-page">
      <div className="success-card">

        <div className="success-icon">✓</div>
        <h1 className="success-title">Order Placed!</h1>
        <p className="success-subtitle">
          Thank you, <strong>{form.fullName}</strong>. Your order has been received.
          We'll contact you shortly to confirm delivery.
        </p>

        <div className="success-summary">
          <div className="success-row">
            <span>Product</span>
            <span>{product?.name}</span>
          </div>
          <div className="success-row">
            <span>Storage</span>
            <span>{selectedStorage}</span>
          </div>
          <div className="success-row">
            <span>Color</span>
            <span>{selectedColor}</span>
          </div>
          <div className="success-row">
            <span>Quantity</span>
            <span>{quantity}</span>
          </div>
          <div className="success-row">
            <span>Total</span>
            <span>{total}</span>
          </div>
          <div className="success-row">
            <span>Delivery to</span>
            <span>{form.location}</span>
          </div>
        </div>

        <p className="success-note">
          A confirmation has been sent to <strong>{form.email}</strong> and via WhatsApp to <strong>{form.phone}</strong>.
        </p>

        <div className="success-actions">
          <button className="success-btn-home" onClick={() => navigate('/')}>Back to Home</button>
          <button className="success-btn-more" onClick={() => navigate('/iphone')}>Shop More iPhones</button>
        </div>

      </div>
    </div>
  );
}