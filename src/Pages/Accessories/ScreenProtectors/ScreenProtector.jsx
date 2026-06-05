import ProductCard from "../../../components/ProductCard";
import screenprotectorsProducts from "../../../data/screenprotectorsProducts.json";
import "./ScreenProtector.css";

export default function ScreenProtector() {
  return (
    <div className="screen-protector-page">

      <div className="screen-protector-page__header">
        <span className="screen-protector-page__eyebrow">
          Accessories Collection
        </span>

        <h1 className="screen-protector-page__title">
          Screen Protectors
        </h1>

        <p className="screen-protector-page__subtitle">
          The full lineup — from tempered glass to hydrogel films for every device.
        </p>
      </div>

      <div className="screen-protector-page__inner">
        <div className="screen-protector-page__grid">

          {screenprotectorsProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              basePath="/screen-protectors"
            />
          ))}

        </div>
      </div>

    </div>
  );
}