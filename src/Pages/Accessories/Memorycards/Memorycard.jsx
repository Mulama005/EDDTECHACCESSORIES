import ProductCard from '../../../components/ProductCard';
import memorycardsProducts from '../../../data/memorycardsProducts';
import './memoryxard.css';

export default function Memorycard() {
  return (
    <div className="memorycard-page">
      <div className="memorycard-page__header">
        <span className="memorycard-page__eyebrow">Memory Cards Collection</span>

        <h1 className="memorycard-page__title">Memory Cards</h1>

        <p className="memorycard-page__subtitle">
          Explore storage solutions for your devices with high-speed memory cards built for durability and performance.
        </p>
      </div>

      <div className="memorycard-page__inner">
        <div className="memorycard-page__grid">
          {memorycardsProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              basePath="/memorycards"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
