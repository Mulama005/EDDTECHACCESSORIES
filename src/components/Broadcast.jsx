import { useBroadcast } from "./hooks/useBroadcast";
import "../styles/Broadcast.css";

export default function Broadcast({onSent}) {
  const {
    broadcast,
    setBroadcast,
    sendBroadcast,
    loading,
    message,
  } = useBroadcast();

  const handleChange = (field, value) => {
    setBroadcast(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendBroadcast();
    if (onSent) onSent(); 
  };



  return (
    <div className="broadcast-card">
      <h2 className="broadcast-title"> Create Campaign</h2>

      <form onSubmit={handleSubmit} className="broadcast-form">

        {/* EMAIL SECTION */}
        <div className="broadcast-section">
          <h4 className="broadcast-section__title">Email</h4>

          <div className="broadcast-field">
            <label>Subject *</label>
            <input
              value={broadcast.subject}
              onChange={e => handleChange("subject", e.target.value)}
              placeholder="Big Sale on new Products"
              required
            />
          </div>

          <div className="broadcast-field">
            <label>Preheader</label>
            <input
              value={broadcast.preheader}
              onChange={e => handleChange("preheader", e.target.value)}
              placeholder="Limited time offer..."
            />
          </div>
        </div>

        {/* PRODUCT SECTION */}
        <div className="broadcast-section">
          <h4 className="broadcast-section__title">Product</h4>

          <div className="broadcast-field">
            <label>Product Name *</label>
            <input
              value={broadcast.product_name}
              onChange={e => handleChange("product_name", e.target.value)}
              required
            />
          </div>

          <div className="broadcast-field">
            <label>Description *</label>
            <textarea
              value={broadcast.product_description}
              onChange={e => handleChange("product_description", e.target.value)}
              required
            />
          </div>

          <div className="broadcast-field">
            <label>Price</label>
            <input
              value={broadcast.product_price}
              onChange={e => handleChange("product_price", e.target.value)}
              placeholder="Ksh 45,000"
            />
          </div>

          <div className="broadcast-field">
            <label>Image URL</label>
            <input
              value={broadcast.product_image}
              onChange={e => handleChange("product_image", e.target.value)}
              placeholder="https://..."
            />
          </div>

          {/* Preview */}
          {broadcast.product_image && (
            <div className="broadcast-preview">
              <img src={broadcast.product_image} alt="Preview" />
            </div>
          )}
        </div>

        {/* CTA + AUDIENCE */}
        <div className="broadcast-section">
          <h4 className="broadcast-section__title">Campaign Settings</h4>

          <div className="broadcast-field">
            <label>CTA Text</label>
            <input
              value={broadcast.cta_text}
              onChange={e => handleChange("cta_text", e.target.value)}
              placeholder="Shop Now"
            />
          </div>

          <div className="broadcast-field">
            <label>Audience</label>
            <select
              value={broadcast.audience}
              onChange={e => handleChange("audience", e.target.value)}
            >
              <option value="all">All Subscribers</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* SUBMIT */}
        <button className="broadcast-btn" disabled={loading}>
          {loading ? "Sending..." : " Launch Campaign"}
        </button>

        {message && <p className="broadcast-message">{message}</p>}
      </form>
    </div>
  );
}