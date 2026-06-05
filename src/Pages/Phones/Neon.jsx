import ProductCard from '../../components/ProductCard';
import neonProducts from '../../data/neonProducts';
import './neon.css';

export default function Neon() {
  return (
    <div className="neon-page">
      <div className="neon-page__header">
        <span className="neon-page__eyebrow">Neon Collection</span>

        <h1 className="neon-page__title">Neon Phones</h1>

        <p className="neon-page__subtitle">
          Browse Neon’s latest smartphones, designed for style and performance.
        </p>
      </div>

      <div className="neon-page__inner">
        <div className="neon-page__grid">
          {neonProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              basePath="/neon"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
