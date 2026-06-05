import ProductCard from '../../components/ProductCard';
import oppoProducts from '../../data/oppoProducts';
import './oppo.css';

export default function Oppo() {
  return (
    <div className="oppo-page">
      <div className="oppo-page__header">
        <span className="oppo-page__eyebrow">OPPO Collection</span>

        <h1 className="oppo-page__title">OPPO Phones</h1>

        <p className="oppo-page__subtitle">
          Discover the latest OPPO smartphones and the best value models in one place.
        </p>
      </div>

      <div className="oppo-page__inner">
        <div className="oppo-page__grid">
          {oppoProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              basePath="/oppo"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
