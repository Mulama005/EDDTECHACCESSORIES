import { useParams } from 'react-router-dom';
import neonProducts from '../../data/neonProducts';
import ProductDetail from '../../components/ProductDetail';

export default function NeonDetail() {
  const { id } = useParams();
  const product = neonProducts.find(p => p.id === Number(id));

  if (!product) {
    return <p style={{ padding: '40px 24px', color: 'var(--text-secondary)' }}>Product not found.</p>;
  }

  const relatedProducts = neonProducts.filter(p => p.id !== product.id);

  return (
    <ProductDetail
      product={product}
      relatedProducts={relatedProducts}
      basePath="/neon"
    />
  );
}
