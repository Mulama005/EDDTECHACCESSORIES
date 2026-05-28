import ProductCard from "../../components/ProductCard";
import laptopchargersProducts from "../../data/laptopchargersProducts";
import "./LaptopChargers.css";

export default function LaptopChargers() {
  return (
    <div className="laptop-chargers-page">

      <div className="laptop-chargers-page__header">
        <span className="laptop-chargers-page__eyebrow">
          Chargers
        </span>

        <h1 className="laptop-chargers-page__title">
          Laptop Chargers
        </h1>

        <p className="laptop-chargers-page__subtitle">
          The full lineup — from the latest Laptop Chargers to the best value models.
        </p>
      </div>

      <div className="laptop-chargers-page__inner">
        <div className="laptop-chargers-page__grid">

          {laptopchargersProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              basePath="/laptop-chargers"
            />
          ))}

        </div>
      </div>

    </div>
  );
}