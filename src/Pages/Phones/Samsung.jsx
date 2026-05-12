import { Link } from 'react-router-dom';
import ProductCard from '../../components/ProductCard';
import  samsungProducts  from '../../data/samsungProducts';
import './samsung.css';

export default function Samsung() {
  return (
    <div className="samsung-page">
      <div className="samsung-page__header">
        <span className="samsung-page__eyebrow">Samsung Collection</span>
        <h1 className="samsung-page__title">Galaxy Phones</h1>
        <p className="samsung-page__subtitle">
          The full lineup — from the latest Galaxy S to the best value models.
        </p>
      </div>
      <div className="samsung-page__inner">
        <div className="samsung-page__grid">
          {samsungProducts.map(product => (
            <Link to={`/samsung/${product.id}`} key={product.id} style={{ textDecoration: 'none' }}>
              <ProductCard product={product} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}