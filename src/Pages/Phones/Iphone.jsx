import ProductCard from '../../components/ProductCard';
import iphoneProducts from '../../data/iphoneProducts';
import './iphone.css';

export default function Iphone() {
  return (
    <div className="iphone-page">
      <div className="iphone-page__header">
        <span className="iphone-page__eyebrow">Apple Collection</span>

        <h1 className="iphone-page__title">iPhones</h1>

        <p className="iphone-page__subtitle">
          The full lineup from the latest Pro Max to the best value models.
        </p>
      </div>

      <div className="iphone-page__inner">
        <div className="iphone-page__grid">

          {iphoneProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              basePath="/iphone"
            />
          ))}

        </div>
      </div>
    </div>
  );
}