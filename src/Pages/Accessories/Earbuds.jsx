import { Link } from 'react-router-dom';
import ProductCard from '../../components/ProductCard';
import  earbudsProducts  from '../../data/earbudsProducts';
import './Earbuds.css';

export default function Earbuds() {
  return (
    <div className="earbuds-page">
      <div className="earbuds-page__header">
        <span className="earbuds-page__eyebrow">Audio Collection</span>
        <h1 className="earbuds-page__title">Earbuds</h1>
        <p className="earbuds-page__subtitle">
          The full lineup  from the latest Earbuds to the best value models.
        </p>
      </div>
      <div className="earbuds-page__inner">
        <div className="earbuds-page__grid">
          {earbudsProducts.map(product => (
            <Link to={`/earbuds/${product.id}`} key={product.id} style={{ textDecoration: 'none' }}>
              <ProductCard product={product} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}