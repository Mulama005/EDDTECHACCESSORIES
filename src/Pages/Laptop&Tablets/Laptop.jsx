import ProductCard from "../../components/ProductCard";
import laptopProducts from "../../data/laptopProducts";
import "./Laptop.css";

export default function Laptop() {
  return (
    <div className="laptop-page">

      <div className="laptop-page__header">
        <span className="laptop-page__eyebrow">
          Computing Collection
        </span>

        <h1 className="laptop-page__title">
          Laptops
        </h1>

        <p className="laptop-page__subtitle">
          The full lineup — from the latest Laptops to the best value models.
        </p>
      </div>

      <div className="laptop-page__inner">
        <div className="laptop-page__grid">

          {laptopProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              basePath="/laptops"
            />
          ))}

        </div>
      </div>

    </div>
  );
}