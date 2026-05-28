import ProductCard from "../../components/ProductCard";
import phonechargersProducts from "../../data/phonechargersProducts";
import "./PhoneChargers.css";

export default function PhoneChargers() {
  return (
    <div className="phone-chargers-page">

      <div className="phone-chargers-page__header">
        <span className="phone-chargers-page__eyebrow">
          Chargers
        </span>

        <h1 className="phone-chargers-page__title">
          Phone Chargers
        </h1>

        <p className="phone-chargers-page__subtitle">
          The full lineup — from the latest Phone Chargers to the best value models.
        </p>
      </div>

      <div className="phone-chargers-page__inner">
        <div className="phone-chargers-page__grid">

          {phonechargersProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              basePath="/phone-chargers"
            />
          ))}

        </div>
      </div>

    </div>
  );
}