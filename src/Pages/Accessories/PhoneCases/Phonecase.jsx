import ProductCard from "../../../components/ProductCard";
import phoneCaseProducts from "../../../data/phoneCaseProducts.json";
import "./PhoneCase.css";

export default function PhoneCase() {
  return (
    <div className="phone-case-page">

      <div className="phone-case-page__header">
        <span className="phone-case-page__eyebrow">
          Accessories Collection
        </span>

        <h1 className="phone-case-page__title">
          Phone Cases
        </h1>

        <p className="phone-case-page__subtitle">
          The full lineup — from rugged protection to slim everyday styles.
        </p>
      </div>

      <div className="phone-case-page__inner">
        <div className="phone-case-page__grid">

          {phoneCaseProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              basePath="/phone-cases"
            />
          ))}

        </div>
      </div>

    </div>
  );
}