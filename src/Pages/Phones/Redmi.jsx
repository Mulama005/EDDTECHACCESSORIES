import ProductCard from '../../components/ProductCard';
import redmiProducts from '../../data/redmiProducts';
import './redmi.css';

export default function Redmi() {
  return (
    <div className="redmi-page">
      <div className="redmi-page__header">
        <span className="redmi-page__eyebrow">Redmi Collection</span>

        <h1 className="redmi-page__title">Redmi Phones</h1>

        <p className="redmi-page__subtitle">
          Explore Redmi's latest smartphones and top value models.
        </p>
      </div>

      <div className="redmi-page__inner">
        <div className="redmi-page__grid">
          {redmiProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              basePath="/redmi"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
