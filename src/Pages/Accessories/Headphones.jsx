import ProductCard from "../../components/ProductCard";
import headphonesProducts from "../../data/headphonesProducts";
import "./Headphones.css";

export default function Headphones() {
  return (
    <div className="headphones-page">

      <div className="headphones-page__header">
        <span className="headphones-page__eyebrow">
          Audio Collection
        </span>

        <h1 className="headphones-page__title">
          Headphones
        </h1>

        <p className="headphones-page__subtitle">
          The full lineup — from the latest Headphones to the best value models.
        </p>
      </div>

      <div className="headphones-page__inner">
        <div className="headphones-page__grid">

          {headphonesProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              basePath="/headphones"
            />
          ))}

        </div>
      </div>

    </div>
  );
}