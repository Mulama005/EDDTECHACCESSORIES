// Speakers.jsx

import ProductCard from "../../components/ProductCard";
import speakersProducts from "../../data/speakersProducts";
import "./Speakers.css";

export default function Speakers() {
  return (
    <div className="speakers-page">

      <div className="speakers-page__header">

        <span className="speakers-page__eyebrow">
          Audio
        </span>

        <h1 className="speakers-page__title">
          Speakers
        </h1>

        <p className="speakers-page__subtitle">
          Premium wireless, portable, Bluetooth, and smart speakers
          designed for immersive sound and modern lifestyles.
        </p>

      </div>

      <div className="speakers-page__inner">

        <div className="speakers-page__grid">

          {speakersProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              basePath="/speakers"
            />
          ))}

        </div>

      </div>

    </div>
  );
}