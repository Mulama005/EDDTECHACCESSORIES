import { useParams } from 'react-router-dom';
import  earphonesProducts  from '../../data/earphonesProducts';
import ProductDetail from '../../components/ProductDetail';

export default function EarphonesDetail() {
  const { id } = useParams();
  const product = earphonesProducts.find(p => p.id === Number(id));

  if (!product) {
    return <p style={{ padding: '40px 24px', color: 'var(--text-secondary)' }}>Product not found.</p>;
  }

  const relatedProducts = earphonesProducts.filter(p => p.id !== product.id);

  return (
    <ProductDetail
      product={product}
      relatedProducts={relatedProducts}
      basePath="/earphones"
    />
  );
}