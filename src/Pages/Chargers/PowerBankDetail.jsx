import { useParams } from 'react-router-dom';
import  powerbankProducts  from '../../data/powerbankProducts';
import ProductDetail from '../../components/ProductDetail';

export default function PowerBankDetail() {
  const { id } = useParams();
  const product = powerbankProducts.find(p => p.id === Number(id));

  if (!product) {
    return <p style={{ padding: '40px 24px', color: 'var(--text-secondary)' }}>Product not found.</p>;
  }

  const relatedProducts = powerbankProducts.filter(p => p.id !== product.id);

  return (
    <ProductDetail
      product={product}
      relatedProducts={relatedProducts}
      basePath="/powerbanks"
    />
  );
}