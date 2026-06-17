import { useParams } from 'react-router-dom';
import clocksProducts from '../../../data/clocksProducts';
import ProductDetail from '../../../components/ProductDetail';

export default function ClockDetail() {
  const { id } = useParams();
  const product = clocksProducts.find(p => p.id === Number(id));

  if (!product) {
    return <p style={{ padding: '40px 24px', color: 'var(--text-secondary)' }}>Product not found.</p>;
  }

  const relatedProducts = clocksProducts.filter(p => p.id !== product.id);

  return (
    <ProductDetail
      product={product}
      relatedProducts={relatedProducts}
      basePath="/clocks"
    />
  );
}
