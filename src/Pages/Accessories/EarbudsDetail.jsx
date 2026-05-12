import { useParams } from 'react-router-dom';
import  earbudsProducts  from '../../data/earbudsProducts';
import ProductDetail from '../../components/ProductDetail';

export default function EarbudsDetail() {
  const { id } = useParams();
  const product = earbudsProducts.find(p => p.id === Number(id));

  if (!product) {
    return <p style={{ padding: '40px 24px', color: 'var(--text-secondary)' }}>Product not found.</p>;
  }

  const relatedProducts = earbudsProducts.filter(p => p.id !== product.id);

  return (
    <ProductDetail
      product={product}
      relatedProducts={relatedProducts}
      basePath="/earbuds"
    />
  );
}