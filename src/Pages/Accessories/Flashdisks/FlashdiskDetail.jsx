import { useParams } from 'react-router-dom';
import flashdisksProducts from '../../../data/flashdisksProducts';
import ProductDetail from '../../../components/ProductDetail';

export default function FlashdiskDetail() {
  const { id } = useParams();
  const product = flashdisksProducts.find(p => p.id === Number(id));

  if (!product) {
    return <p style={{ padding: '40px 24px', color: 'var(--text-secondary)' }}>Product not found.</p>;
  }

  const relatedProducts = flashdisksProducts.filter(p => p.id !== product.id);

  return (
    <ProductDetail
      product={product}
      relatedProducts={relatedProducts}
      basePath="/flashdisks"
    />
  );
}
