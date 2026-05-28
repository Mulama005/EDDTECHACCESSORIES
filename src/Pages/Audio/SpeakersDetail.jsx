// SpeakersDetail.jsx

import { useParams } from "react-router-dom";
import speakersProducts from "../../data/speakersProducts";
import ProductDetail from "../../components/ProductDetail";

export default function SpeakersDetail() {

  const { id } = useParams();

  const product = speakersProducts.find(
    p => p.id === Number(id)
  );

  if (!product) {
    return (
      <p
        style={{
          padding: "40px 24px",
          color: "var(--text-secondary)"
        }}
      >
        Product not found.
      </p>
    );
  }

  const relatedProducts = speakersProducts.filter(
    p => p.id !== product.id
  );

  return (
    <ProductDetail
      product={product}
      relatedProducts={relatedProducts}
      basePath="/speakers"
    />
  );
}