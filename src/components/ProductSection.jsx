import { useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard';
import '../styles/ProductSection.css';


export default function ProductSection({ title, products, path }) {
  const navigate = useNavigate();

  return (
    <section className="product-section">
      <div className="product-section__inner">
        <div className="product-section__header">
          <div className="product-section__title-group">
            <div className="product-section__line" />
            <h2 className="product-section__title">{title}</h2>
          </div>
        </div>

        <div className="product-section__grid">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="product-section__explore">
          {/* */}
          <button 
            className="explore-btn" 
            onClick={() => navigate(path)}
          >
            Explore More {title} →
          </button>
        </div>
      </div>
    </section>
  );
}