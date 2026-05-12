import { Link } from 'react-router-dom';
import ProductCard from '../../components/ProductCard';
import  tabletProducts  from '../../data/tabletProducts';
import './Tablet.css';

export default function Tablet() {
  return (
    <div className="tablet-page">
      <div className="tablet-page__header">
        <span className="tablet-page__eyebrow">Computing Collection</span>
        <h1 className="tablet-page__title">Tablets</h1>
        <p className="tablet-page__subtitle">
          The full lineup from the latest Tablets to the best value models.
        </p>
      </div>
      <div className="tablet-page__inner">
        <div className="tablet-page__grid">
          {tabletProducts.map(product => (
            <Link to={`/tablets/${product.id}`} key={product.id} style={{ textDecoration: 'none' }}>
              <ProductCard product={product} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}