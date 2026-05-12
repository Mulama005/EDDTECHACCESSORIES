import { useParams } from 'react-router-dom';
import  laptopchargersProducts  from '../../data/laptopchargersProducts';
import ProductDetail from '../../components/ProductDetail';

export default function LaptopChargersDetail() {
  const { id } = useParams();
  const product = laptopchargersProducts.find(p => p.id === Number(id));

  if (!product) {
    return <p style={{ padding: '40px 24px', color: 'var(--text-secondary)' }}>Product not found.</p>;
  }

  const relatedProducts = laptopchargersProducts.filter(p => p.id !== product.id);

  return (
    <ProductDetail
      product={product}
      relatedProducts={relatedProducts}
      basePath="/laptop-chargers"
    />
  );
}