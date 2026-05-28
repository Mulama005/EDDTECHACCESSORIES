import ProductCard from "../../components/ProductCard";
import powerbankProducts from "../../data/powerbankProducts";
import "./PowerBank.css";

export default function PowerBank() {
  return (
    <div className="powerbank-page">

      <div className="powerbank-page__header">
        <span className="powerbank-page__eyebrow">
          Power Banks
        </span>

        <h1 className="powerbank-page__title">
          Power Banks
        </h1>

        <p className="powerbank-page__subtitle">
          The full lineup — from the latest Power Banks to the best value models.
        </p>
      </div>

      <div className="powerbank-page__inner">
        <div className="powerbank-page__grid">

          {powerbankProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              basePath="/powerbanks"
            />
          ))}

        </div>
      </div>

    </div>
  );
}