import ProductCard from "../../components/ProductCard";
import carchargersProducts from "../../data/carchargersProducts.json";
import "./CarChargers.css";

const carChargerProducts = carchargersProducts;

export default function CarCharger() {
  return (
    <div className="car-chargers-page">
      <div className="car-chargers-page__header">
        <span className="car-chargers-page__eyebrow">Car Chargers Collection</span>

        <h1 className="car-chargers-page__title">Car Chargers</h1>

        <p className="car-chargers-page__subtitle">
          Browse our selection of car chargers and mounts built for fast charging on the go.
        </p>
      </div>

      <div className="car-chargers-page__inner">
        <div className="car-chargers-page__grid">
          {carChargerProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              basePath="/car-chargers"
            />
          ))}
        </div>
      </div>
    </div>
  );
}