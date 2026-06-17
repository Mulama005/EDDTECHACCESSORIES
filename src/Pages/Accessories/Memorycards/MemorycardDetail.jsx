import { useParams } from 'react-router-dom';
import memorycardsProducts from '../../../data/memorycardsProducts';
import ProductDetail from '../../../components/ProductDetail';

export default function MemorycardDetail() {
  const { id } = useParams();
  const product = memorycardsProducts.find(p => p.id === Number(id));

  if (!product) {
    return <p style={{ padding: '40px 24px', color: 'var(--text-secondary)' }}>Product not found.</p>;
  }

  const relatedProducts = memorycardsProducts.filter(p => p.id !== product.id);

  return (
    <ProductDetail
      product={product}
      relatedProducts={relatedProducts}
      basePath="/memorycards"
    />
  );
}
