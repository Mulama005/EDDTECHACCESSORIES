import { useCart } from '../context/CartContext';
import { useNavigate, Link } from 'react-router-dom';
import './Cart.css';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/cart-order', { state: { cart, cartTotal } });
  };

  const handleWhatsAppAll = () => {
    const lines = cart
      .map(item =>
        `• ${item.name} | ${item.selectedStorage || 'N/A'} | ${item.selectedColor || 'N/A'} | Qty: ${item.quantity} | ${item.price}`
      )
      .join('\n');

    const message = `Hi, I'd like to order the following:\n\n${lines}\n\nTotal: Ksh ${cartTotal.toLocaleString()}`;
    window.open(`https://wa.me/254758743522?text=${encodeURIComponent(message)}`, '_blank');
  };

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <div className="cart-empty__icon">🛒</div>
        <h2>Your cart is empty</h2>
        <p>Browse our products and add items to your cart.</p>
        <button className="cart-empty__btn" onClick={() => navigate('/')}>Continue Shopping</button>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <div>
          <h1 className="cart-title">Your Cart</h1>
          <p className="cart-subtitle">{cart.length} item{cart.length !== 1 ? 's' : ''} in your cart</p>
        </div>
        <button
          type="button"
          className="cart-clear-btn"
          onClick={() => {
            if (window.confirm('Clear all items from cart?')) clearCart();
          }}
        >
          🗑 Clear Cart
        </button>
      </div>

      <div className="cart-body">
        <div className="cart-items">
          {cart.map(item => {
            const itemTotal = parseInt(item.price.replace(/[^0-9]/g, ''), 10) * item.quantity;
            return (
              <div className="cart-item" key={item.cartId}>
                <div className="cart-item__img">
                  {item.image ? <img src={item.image} alt={item.name} /> : '📦'}
                </div>
                <div className="cart-item__info">
                  <p className="cart-item__name">{item.name}</p>
                  <div className="cart-item__opts">
                    {item.selectedStorage && <span className="cart-item__opt">{item.selectedStorage}</span>}
                    {item.selectedColor && <span className="cart-item__opt">{item.selectedColor}</span>}
                  </div>
                  <p className="cart-item__price">{item.price}</p>
                </div>

                <div className="cart-item__qty">
                  <button
                    type="button"
                    className="cart-qty-btn"
                    onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                  >
                    −
                  </button>
                  <div className="cart-qty-val">{item.quantity}</div>
                  <button
                    type="button"
                    className="cart-qty-btn"
                    onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>

                <div className="cart-item__subtotal">
                  <span className="cart-item__subtotal-label">Subtotal</span>
                  <span className="cart-item__subtotal-val">Ksh {itemTotal.toLocaleString()}</span>
                </div>

                <button
                  type="button"
                  className="cart-item__remove"
                  onClick={() => removeFromCart(item.cartId)}
                  title="Remove item"
                >
                  ✕
                </button>
              </div>
            );
          })}
        </div>

        <div className="cart-summary">
          <h2 className="cart-summary__title">Order Summary</h2>
          <div className="cart-summary__rows">
            {cart.map(item => {
              const itemTotal = parseInt(item.price.replace(/[^0-9]/g, ''), 10) * item.quantity;
              return (
                <div className="cart-summary__row" key={item.cartId}>
                  <span className="cart-summary__row-name">{item.name} ×{item.quantity}</span>
                  <span className="cart-summary__row-price">Ksh {itemTotal.toLocaleString()}</span>
                </div>
              );
            })}
          </div>

          <div className="cart-summary__divider" />
          <div className="cart-summary__total">
            <span>Total</span>
            <span>Ksh {cartTotal.toLocaleString()}</span>
          </div>

          <div className="cart-summary__payment">
            <div className="cart-payment-opt">
              <div className="cart-radio-dot">
                <div className="cart-radio-inner" />
              </div>
              Cash on Delivery
            </div>
          </div>

          <button type="button" className="cart-btn-checkout" onClick={handleCheckout}>
            Proceed to Checkout
          </button>

          <button type="button" className="cart-btn-wa" onClick={handleWhatsAppAll}>
            Order All via WhatsApp
          </button>

          <Link to="/" className="cart-continue-link">
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
