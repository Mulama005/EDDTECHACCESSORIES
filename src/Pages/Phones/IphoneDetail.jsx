import { useParams } from 'react-router-dom';
import  iphoneProducts  from '../../data/iphoneProducts';
import ProductDetail from '../../components/ProductDetail';

export default function IphoneDetail() {
  const { id } = useParams();
  const product = iphoneProducts.find(p => p.id === Number(id));

  if (!product) {
    return <p style={{ padding: '40px 24px', color: 'var(--text-secondary)' }}>Product not found.</p>;
  }

  const relatedProducts = iphoneProducts.filter(p => p.id !== product.id);

  return (
    <ProductDetail
      product={product}
      relatedProducts={relatedProducts}
      basePath="/iphone"
    />
  );
}