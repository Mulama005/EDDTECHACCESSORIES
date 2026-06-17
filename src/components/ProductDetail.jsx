import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../styles/ProductDetail.css';

export default function ProductDetail({ product, relatedProducts, basePath = '/iphone'  }) {
  const [selectedStorage, setSelectedStorage] = useState(product.storageOptions?.[0] || null);
  const [selectedColor, setSelectedColor] = useState(product.colorOptions?.[0] || null);
  const [quantity, setQuantity] = useState(1);

  const handleDecrease = () => setQuantity(q => Math.max(1, q - 1));
  const handleIncrease = () => setQuantity(q => q + 1);

  const handleWhatsApp = () => {
    const message = `Hi, I'd like to order:\n*${product.name}*\nStorage: ${selectedStorage}\nColor: ${selectedColor}\nQuantity: ${quantity}\nPrice: ${product.price}`;
    const url = `https://wa.me/${product.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const navigate = useNavigate();

  const handleBuyNow = () => {
    navigate('/order', {
        state: {
            product,
            selectedStorage,
            selectedColor,
            quantity,
        },
    });
};

  return (
    <div className="pd-page">

      {/* ── Main Section ── */}
      <div className="pd-main">

        {/* LEFT: Image + Description */}
        <div className="pd-left">
          <div className="pd-img-wrap">
            {product.image ? (
              <img src={product.image} alt={product.name} className="pd-img" />
            ) : (
              <div className="pd-img-placeholder" />
            )}
          </div>
          <div className="pd-description">
            <span className="pd-label">Description</span>
            <p>{product.description}</p>
          </div>
        </div>

        {/* RIGHT: Info + Actions */}
        <div className="pd-right">

          <div className="pd-name-row">
            <h1 className="pd-name">{product.name}</h1>
            <span className={`pd-badge ${product.inStock ? 'pd-badge--in' : 'pd-badge--out'}`}>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>

          <div className="pd-price">{product.price}</div>

          {/* Storage Options */}
          {product.storageOptions && (
            <div className="pd-option-group">
              <span className="pd-label">Storage</span>
              <div className="pd-options">
                {product.storageOptions.map(opt => (
                  <button
                    key={opt}
                    className={`pd-opt ${selectedStorage === opt ? 'pd-opt--selected' : ''}`}
                    onClick={() => setSelectedStorage(opt)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Color Options */}
          {product.colorOptions && (
            <div className="pd-option-group">
              <span className="pd-label">Color</span>
              <div className="pd-options">
                {product.colorOptions.map(opt => (
                  <button
                    key={opt}
                    className={`pd-opt ${selectedColor === opt ? 'pd-opt--selected' : ''}`}
                    onClick={() => setSelectedColor(opt)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="pd-option-group">
            <span className="pd-label">Quantity</span>
            <div className="pd-qty">
              <button className="pd-qty__btn" onClick={handleDecrease}>−</button>
              <span className="pd-qty__val">{quantity}</span>
              <button className="pd-qty__btn" onClick={handleIncrease}>+</button>
            </div>
          </div>

          {/* WhatsApp */}
          <button className="pd-btn-wa" onClick={handleWhatsApp}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.121 1.535 5.851L.057 23.386a.5.5 0 0 0 .61.61l5.535-1.478A11.944 11.944 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.691-.503-5.234-1.381l-.375-.213-3.885 1.038 1.038-3.885-.213-.375A9.956 9.956 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
            </svg>
            Quick Order on WhatsApp
          </button>

          <div className="pd-btn-row">
            <button className="pd-btn-buy" onClick={handleBuyNow}>Buy Now</button>
          </div>

        </div>
      </div>

      {/* ── Related Products ── */}
      {relatedProducts?.length > 0 && (
        <div className="pd-related">
          <h2 className="pd-section-title">Related Products</h2>
          <div className="pd-related__grid">
            {relatedProducts.map(item => (
               <Link to={`${basePath}/${item.id}`} key={item.id} className="pd-related__card">
                <div className="pd-related__img">
                  {item.image
                    ? <img src={item.image} alt={item.name} />
                    : <div className="pd-related__img-ph" />
                  }
                </div>
                <div className="pd-related__body">
                  <p className="pd-related__name">{item.name}</p>
                  <p className="pd-related__price">{item.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}