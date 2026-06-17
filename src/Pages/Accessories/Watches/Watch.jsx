import ProductCard from '../../../components/ProductCard';
import watchProducts from '../../../data/watchProducts';
import './watch.css';

export default function Watch() {
  return (
    <div className="watch-page">
      <div className="watch-page__header">
        <span className="watch-page__eyebrow">Watches Collection</span>

        <h1 className="watch-page__title">Watches</h1>

        <p className="watch-page__subtitle">
          Discover elegant and durable watches for every style and occasion.
        </p>
      </div>

      <div className="watch-page__inner">
        <div className="watch-page__grid">
          {watchProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              basePath="/watches"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
