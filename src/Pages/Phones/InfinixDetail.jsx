import { useParams } from 'react-router-dom';
import  infinixProducts  from '../../data/infinixProducts';
import ProductDetail from '../../components/ProductDetail';

export default function InfinixDetail() {
  const { id } = useParams();
  const product = infinixProducts.find(p => p.id === Number(id));

  if (!product) {
    return <p style={{ padding: '40px 24px', color: 'var(--text-secondary)' }}>Product not found.</p>;
  }

  const relatedProducts = infinixProducts.filter(p => p.id !== product.id);

  return (
    <ProductDetail
      product={product}
      relatedProducts={relatedProducts}
      basePath="/infinix"
    />
  );
}