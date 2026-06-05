import ProductCard from '../../components/ProductCard';
import infinixProducts from '../../data/infinixProducts';
import './infinix.css';

export default function Infinix() {
  return (
    <div className="infinix-page">
      <div className="infinix-page__header">
        <span className="infinix-page__eyebrow">Infinix Collection</span>

        <h1 className="infinix-page__title">Infinix Latest Phones</h1>

        <p className="infinix-page__subtitle">
          The full lineup from the latest to the best value models.
        </p>
      </div>

      <div className="infinix-page__inner">
        <div className="infinix-page__grid">

          {infinixProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              basePath="/infinix"
            />
          ))}

        </div>
      </div>
    </div>
  );
}