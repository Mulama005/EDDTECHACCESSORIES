import { useParams } from 'react-router-dom';
import redmiProducts from '../../data/redmiProducts';
import ProductDetail from '../../components/ProductDetail';

export default function RedmiDetail() {
  const { id } = useParams();
  const product = redmiProducts.find(p => p.id === Number(id));

  if (!product) {
    return <p style={{ padding: '40px 24px', color: 'var(--text-secondary)' }}>Product not found.</p>;
  }

  const relatedProducts = redmiProducts.filter(p => p.id !== product.id);

  return (
    <ProductDetail
      product={product}
      relatedProducts={relatedProducts}
      basePath="/redmi"
    />
  );
}
