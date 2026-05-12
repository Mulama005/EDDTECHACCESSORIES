import { Link } from 'react-router-dom';
import ProductCard from '../../components/ProductCard';
import  infinixProducts  from '../../data/infinixProducts';
import './infinix.css';

export default function Infinix() {
  return (
    <div className="infinix-page">
      <div className="infinix-page__header">
        <span className="infinix-page__eyebrow">Infinix Collection</span>
        <h1 className="infinx-page__title">Infinix</h1>
        <p className="infinix-page__subtitle">
          The full lineup — from the latest to the best value models.
        </p>
      </div>
      <div className="infinix-page__inner">
        <div className="infinix-page__grid">
          {infinixProducts.map(product => (
            <Link to={`/infinix/${product.id}`} key={product.id} style={{ textDecoration: 'none' }}>
              <ProductCard product={product} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}