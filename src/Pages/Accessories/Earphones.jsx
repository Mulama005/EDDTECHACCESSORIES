import { Link } from 'react-router-dom';
import ProductCard from '../../components/ProductCard';
import  earphonesProducts  from '../../data/earphonesProducts';
import './Earphones.css';

export default function Earphones() {
  return (
    <div className="earphones-page">
      <div className="earphones-page__header">
        <span className="earphones-page__eyebrow">Audio Collection</span>
        <h1 className="earphones-page__title">Earphones</h1>
        <p className="earphones-page__subtitle">
          The full lineup — from the latest Earphones to the best value models.
        </p>
      </div>
      <div className="earphones-page__inner">
        <div className="earphones-page__grid">
          {earphonesProducts.map(product => (
            <Link to={`/earphones/${product.id}`} key={product.id} style={{ textDecoration: 'none' }}>
              <ProductCard product={product} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}