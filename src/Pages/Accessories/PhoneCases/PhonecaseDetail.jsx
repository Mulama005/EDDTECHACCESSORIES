import { useParams } from 'react-router-dom';
import phoneCaseProducts from '../../../data/phoneCaseProducts.json';
import ProductDetail from '../../../components/ProductDetail';

export default function PhoneCaseDetail() {
  const { id } = useParams();
  const product = phoneCaseProducts.find(p => p.id === Number(id));

  if (!product) {
    return <p style={{ padding: '40px 24px', color: 'var(--text-secondary)' }}>Product not found.</p>;
  }

  const relatedProducts = phoneCaseProducts.filter(p => p.id !== product.id);

  return (
    <ProductDetail
      product={product}
      relatedProducts={relatedProducts}
      basePath="/phone-cases"
    />
  );
}