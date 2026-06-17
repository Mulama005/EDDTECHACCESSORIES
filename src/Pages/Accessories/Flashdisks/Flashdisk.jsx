import ProductCard from '../../../components/ProductCard';
import flashdisksProducts from '../../../data/flashdisksProducts';
import './flashdisk.css';

export default function Flashdisk() {
  return (
    <div className="flashdisk-page">
      <div className="flashdisk-page__header">
        <span className="flashdisk-page__eyebrow">Flashdisks Collection</span>

        <h1 className="flashdisk-page__title">Flashdisks</h1>

        <p className="flashdisk-page__subtitle">
          Browse high-speed flashdisks for fast, reliable storage and easy portability.
        </p>
      </div>

      <div className="flashdisk-page__inner">
        <div className="flashdisk-page__grid">
          {flashdisksProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              basePath="/flashdisks"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
