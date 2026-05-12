import { useParams } from 'react-router-dom';
import  samsungProducts  from '../../data/samsungProducts';
import ProductDetail from '../../components/ProductDetail';

export default function SamsungDetail() {
  const { id } = useParams();
  const product = samsungProducts.find(p => p.id === Number(id));

  if (!product) {
    return <p style={{ padding: '40px 24px', color: 'var(--text-secondary)' }}>Product not found.</p>;
  }

  const relatedProducts = samsungProducts.filter(p => p.id !== product.id);

  return (
    <ProductDetail
      product={product}
      relatedProducts={relatedProducts}
      basePath="/samsung"
    />
  );
}