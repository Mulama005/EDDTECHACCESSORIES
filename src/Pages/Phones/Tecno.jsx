import ProductCard from '../../components/ProductCard';
import tecnoProducts from '../../data/tecnoProducts';
import './tecno.css';

export default function Tecno() {
  return (
    <div className="tecno-page">
      <div className="tecno-page__header">
        <span className="tecno-page__eyebrow">Tecno Collection</span>

        <h1 className="tecno-page__title">Tecno Phones</h1>

        <p className="tecno-page__subtitle">
          The full lineup from the latest to the best value models.
        </p>
      </div>

      <div className="tecno-page__inner">
        <div className="tecno-page__grid">

          {tecnoProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              basePath="/tecno"
            />
          ))}

        </div>
      </div>
    </div>
  );
}