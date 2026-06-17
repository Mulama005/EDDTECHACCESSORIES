import { useParams } from 'react-router-dom';
import watchProducts from '../../../data/watchProducts';
import ProductDetail from '../../../components/ProductDetail';

export default function WatchDetail() {
  const { id } = useParams();
  const product = watchProducts.find(p => p.id === Number(id));

  if (!product) {
    return <p style={{ padding: '40px 24px', color: 'var(--text-secondary)' }}>Product not found.</p>;
  }

  const relatedProducts = watchProducts.filter(p => p.id !== product.id);

  return (
    <ProductDetail
      product={product}
      relatedProducts={relatedProducts}
      basePath="/watches"
    />
  );
}
