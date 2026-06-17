import ProductCard from '../../../components/ProductCard';
import addonsProducts from '../../../data/addonsProducts.json';
import './Addons.css';

export default function Addons() {
  return (
    <div className="addons-page">
      <div className="addons-page__header">
        <span className="addons-page__eyebrow">Addons Collection</span>

        <h1 className="addons-page__title">Addons</h1>

        <p className="addons-page__subtitle">
          Discover premium phone charms, lens protectors, and mobile accessories designed to elevate your everyday device use.
        </p>
      </div>

      <div className="addons-page__inner">
        <div className="addons-page__grid">
          {addonsProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              basePath="/addons"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
