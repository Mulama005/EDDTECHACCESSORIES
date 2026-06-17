import ProductCard from '../../../components/ProductCard';
import clocksProducts from '../../../data/clocksProducts';
import './clock.css';

export default function Clock() {
  return (
    <div className="clock-page">
      <div className="clock-page__header">
        <span className="clock-page__eyebrow">Clocks Collection</span>

        <h1 className="clock-page__title">Clocks</h1>

        <p className="clock-page__subtitle">
          Shop wall clocks and timepieces for every room, from modern minimalist styles to classic decorative pieces.
        </p>
      </div>

      <div className="clock-page__inner">
        <div className="clock-page__grid">
          {clocksProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              basePath="/clocks"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
