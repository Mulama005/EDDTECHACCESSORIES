import { useParams } from 'react-router-dom';
import  laptopProducts  from '../../data/laptopProducts';
import ProductDetail from '../../components/ProductDetail';

export default function LaptopDetail() {
  const { id } = useParams();
  const product = laptopProducts.find(p => p.id === Number(id));

  if (!product) {
    return <p style={{ padding: '40px 24px', color: 'var(--text-secondary)' }}>Product not found.</p>;
  }

  const relatedProducts = laptopProducts.filter(p => p.id !== product.id);

  return (
    <ProductDetail
      product={product}
      relatedProducts={relatedProducts}
      basePath="/laptops"
    />
  );
}