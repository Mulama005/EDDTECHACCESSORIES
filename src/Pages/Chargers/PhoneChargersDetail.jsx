import { useParams } from 'react-router-dom';
import  phonechargersProducts  from '../../data/phonechargersProducts';
import ProductDetail from '../../components/ProductDetail';

export default function PhoneChargersDetail() {
  const { id } = useParams();
  const product = phonechargersProducts.find(p => p.id === Number(id));

  if (!product) {
    return <p style={{ padding: '40px 24px', color: 'var(--text-secondary)' }}>Product not found.</p>;
  }

  const relatedProducts = phonechargersProducts.filter(p => p.id !== product.id);

  return (
    <ProductDetail
      product={product}
      relatedProducts={relatedProducts}
      basePath="/phone-chargers"
    />
  );
}