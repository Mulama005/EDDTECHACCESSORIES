import { useParams } from 'react-router-dom';
import oppoProducts from '../../data/oppoProducts';
import ProductDetail from '../../components/ProductDetail';

export default function OppoDetail() {
  const { id } = useParams();
  const product = oppoProducts.find(p => p.id === Number(id));

  if (!product) {
    return <p style={{ padding: '40px 24px', color: 'var(--text-secondary)' }}>Product not found.</p>;
  }

  const relatedProducts = oppoProducts.filter(p => p.id !== product.id);

  return (
    <ProductDetail
      product={product}
      relatedProducts={relatedProducts}
      basePath="/oppo"
    />
  );
}
