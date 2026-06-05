import { useParams } from 'react-router-dom';
import screenprotectorsProducts from '../../../data/screenprotectorsProducts.json';
import ProductDetail from '../../../components/ProductDetail';

export default function ScreenProtectorDetail() {
  const { id } = useParams();
  const product = screenprotectorsProducts.find(p => p.id === Number(id));

  if (!product) {
    return <p style={{ padding: '40px 24px', color: 'var(--text-secondary)' }}>Product not found.</p>;
  }

  const relatedProducts = screenprotectorsProducts.filter(p => p.id !== product.id);

  return (
    <ProductDetail
      product={product}
      relatedProducts={relatedProducts}
      basePath="/screen-protectors"
    />
  );
}